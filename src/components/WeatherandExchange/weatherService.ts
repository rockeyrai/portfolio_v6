import { WeatherForecast } from "./types";

export class WeatherService {
  private static BASE_URL = "https://api.open-meteo.com/v1/forecast";

  static async getKathmanduForecast(): Promise<WeatherForecast[]> {
    const params = new URLSearchParams({
      latitude: "27.7172",
      longitude: "85.3240",
      daily: "temperature_2m_max,temperature_2m_min,weather_code",
      current: "is_day", // Fetches if it is currently day or night
      timezone: "auto",
      forecast_days: "5",
    });

    try {
      const response = await fetch(`${this.BASE_URL}?${params.toString()}`);
      if (!response.ok) throw new Error("Weather data unavailable");

      const data = await response.json();
      const isCurrentlyDay = data.current.is_day === 1;

      return data.daily.time.map((date: string, index: number) => ({
        date,
        maxTemp: data.daily.temperature_2m_max[index],
        minTemp: data.daily.temperature_2m_min[index],
        weatherCode: data.daily.weather_code[index],
        condition: this.mapWeatherCode(data.daily.weather_code[index]),
        // For the first item (today), we use the real-time isDay status
        isDay: index === 0 ? isCurrentlyDay : true, 
      }));
    } catch (error) {
      console.error("WeatherService Error:", error);
      throw error;
    }
  }

  /**
   * Maps WMO Weather codes to human-readable descriptions
   * Reference: https://open-meteo.com/en/docs
   */
  private static mapWeatherCode(code: number): string {
    if (code === 0) return "Sunny";
    if (code >= 1 && code <= 3) return "Cloudy";
    if ([45, 48].includes(code)) return "Foggy";
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rainy";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snowy";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";
    return "Unknown";
  }
}