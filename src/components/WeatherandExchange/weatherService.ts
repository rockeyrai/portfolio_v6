import { WeatherForecast } from "./types";

export class WeatherService {
  private static BASE_URL = "https://api.open-meteo.com/v1/forecast";

  static async getKathmanduForecast(): Promise<WeatherForecast[]> {
    const params = new URLSearchParams({
      latitude: "27.7172",
      longitude: "85.3240",
      daily: "temperature_2m_max,temperature_2m_min",
      timezone: "auto",
      forecast_days: "5",
    });

    try {
      const response = await fetch(`${this.BASE_URL}?${params.toString()}`);
      if (!response.ok) throw new Error("Weather data unavailable");

      const data = await response.json();
      
      // Map API response to our clean interface
      return data.daily.time.map((date: string, index: number) => ({
        date,
        maxTemp: data.daily.temperature_2m_max[index],
        minTemp: data.daily.temperature_2m_min[index],
      }));
    } catch (error) {
      console.error("WeatherService Error:", error);
      throw error;
    }
  }
}