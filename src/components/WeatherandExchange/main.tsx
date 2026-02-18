"use client";

import React, { useEffect, useState } from "react";
import { CurrencyService } from "./currencyService";
import { WeatherService } from "./weatherService";
import { Moon, Sun, Cloud, TrendingUp } from "lucide-react";
import styles from "./main.module.css";

type WeatherDay = {
  isDay: boolean;
  condition: string;
  weatherCode: number;
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
        const [weatherData, currencyData] = await Promise.all([
          WeatherService.getKathmanduForecast(),
          CurrencyService.getNPRRates(),
        ]);
        setWeather(weatherData);
        setCurrency(currencyData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  // Helper to get flag URLs (Mapping common currencies)
  const getFlagUrl = (code: string) => {
    const mapping: Record<string, string> = {
      USD: "us", EUR: "eu", GBP: "gb", AUD: "au", 
      CAD: "ca", JPY: "jp", CNY: "cn", INR: "in"
    };
    const countryCode = mapping[code] || code.substring(0, 2).toLowerCase();
    return `https://flagcdn.com/w40/${countryCode}.png`;
  };

  if (loading) return <div className={styles.loader}>Loading dashboard...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const today = weather[0];

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.dashboardGrid}>
        {/* Weather Section */}
        {/* <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.titleGroup}>
              <Cloud size={20} />
              <h2>Kathmandu Weather</h2>
            </div>
            {today?.isDay ? <Sun className={styles.sunIcon} /> : <Moon className={styles.moonIcon} />}
          </div>

          <div className={styles.currentWeather}>
            <span className={styles.bigTemp}>{today?.maxTemp}°C</span>
            <span className={styles.conditionBadge}>{today?.condition}</span>
          </div>

          <table className={styles.weatherTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Condition</th>
                <th style={{ textAlign: "right" }}>H / L</th>
              </tr>
            </thead>
            <tbody>
              {weather.map((day, index) => (
                <tr key={index}>
                  <td>{index === 0 ? "Today" : day.date}</td>
                  <td>{day.condition}</td>
                  <td style={{ textAlign: "right" }}>
                    <span className={styles.high}>{day.maxTemp}°</span> / <span className={styles.low}>{day.minTemp}°</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section> */}

        {/* Currency Section */}
        {/* <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.titleGroup}>
              <TrendingUp size={20} />
              <h2>Exchange Rates</h2>
            </div>
            <span className={styles.timestamp}>Ref: NPR</span>
          </div>

          <div className={styles.currencyList}>
            {currency && Object.entries(currency.rates).map(([symbol, rate]) => (
              <div key={symbol} className={styles.currencyRow}>
                <div className={styles.currencyInfo}>
                  <img 
                    src={getFlagUrl(symbol)} 
                    alt={symbol} 
                    className={styles.flag}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  <span className={styles.symbol}>{symbol}</span>
                </div>
                <div className={styles.price}>
                  Rs. {(1 / rate).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <p className={styles.footerNote}>Updated: {currency?.date}</p>
        </section> */}
      </main>
    </div>
  );
}