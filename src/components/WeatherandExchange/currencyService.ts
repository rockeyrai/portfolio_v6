import { ExchangeRates } from "./types";

export class CurrencyService {
  // Correct base URL (no eur.json here)
  private static BASE_URL =
    "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

  static async getNPRRates(): Promise<ExchangeRates> {
    const base = "npr";
    const targets = ["jpy", "usd", "inr", "krw", "aed"];

    try {
      const response = await fetch(`${this.BASE_URL}/${base}.json`);
      if (!response.ok) throw new Error("Exchange rate data unavailable");

      const data = await response.json();
      const allRates = data[base];

      const filteredRates: Record<string, number> = {};

      targets.forEach((t) => {
        if (allRates[t]) {
          filteredRates[t.toUpperCase()] = allRates[t];
        }
      });

      return {
        base: base.toUpperCase(),
        date: data.date,
        rates: filteredRates,
      };
    } catch (error) {
      console.error("CurrencyService Error:", error);
      throw error;
    }
  }
}
