export interface WeatherForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
}

export interface ExchangeRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface AppError {
  message: string;
  status?: number;
}