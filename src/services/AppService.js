import superagent from "superagent";

export default class AppService {
  static getCryptocurrenciesDataPart = async (startFrom) => {
    try {
      const res = await superagent
        .get("http://localhost:3001/api/get-cryptocurrency-listing")
        .query({ startFrom });
      return res.status === 200 && res.body ? res.body : null;
    } catch (err) {
      console.error(err);
      return "error";
    }
  };

  static getCryptocurrencyDataBySymbol = async (symbol) => {
    try {
      const res = await superagent
        .get("http://localhost:3001/api/get-cryptocurrency-by-symbol")
        .query({ symbol });
      return res.status === 200 && res.body ? res.body : null;
    } catch (err) {
      console.error(err);
      return "error";
    }
  };

  static getCryptocurrencyHistoricData = async (symbol, periodDays) => {
    try {
      const res = await superagent
        .get("http://localhost:3001/api/get-cryptocurrency-historic-data")
        .query({ period: periodDays })
        .query({ symbol });
      return res.status === 200 && res.body ? res.body : null;
    } catch (err) {
      console.error(err);
      return "error";
    }
  };
}
