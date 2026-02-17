"use client";

import React, { useEffect, useState } from "react";
import { CurrencyService } from "./currencyService";
import { WeatherService } from "./weatherService";

type WeatherDay = {
  date: string;
  maxTemp: number;
  minTemp: number;
};

type CurrencyData = {
  base: string;
  date: string;
  rates: Record<string, number>;
};

export default function PortfolioDashboard() {
  const [weather, setWeather] = useState<WeatherDay[]>([]);
  const [currency, setCurrency] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const weatherData = await WeatherService.getKathmanduForecast();
        const currencyData = await CurrencyService.getNPRRates();

        setWeather(weatherData);
        setCurrency(currencyData);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>🏔️ Kathmandu Weather (Next 5 Days)</h2>
      <ul>
        {weather.map((day, index) => (
          <li key={index}>
            {day.date}: High {day.maxTemp}°C / Low {day.minTemp}°C
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: "30px" }}>💸 NPR Exchange Rates</h2>
      {currency && (
        <div>
          <p>
            Base: 1 {currency.base} (Updated: {currency.date})
          </p>
          <ul>
            {Object.entries(currency.rates).map(([symbol, rate]) => {
              const inverted = 1 / rate;

              return (
                <li key={symbol}>
                  1 {symbol} = Rs. {inverted.toFixed(2)}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
