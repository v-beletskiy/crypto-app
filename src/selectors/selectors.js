import { createSelector } from "reselect";
import config from "../config";
import TransformData from "../utils/transformData";

const getCryptocurrenciesData = (state) => state.app.cryptocurrenciesData;
const getCurrentPage = (state) => state.app.currentPage;
const getCurrentCryptocurrencyData = state => state.app.currentCryptocurrencyData;
const getCryptocurrencyHistoricData = state => state.app.cryptocurrencyHistoricData;

export const makeCurrentPageCryptocurrencyDataSelector = () => {
  return createSelector(
    [getCryptocurrenciesData, getCurrentPage],
    (cryptocurrenciesData, currentPage) => {
      const filteredCryptocurrenciesData = cryptocurrenciesData.slice(
        currentPage * config.CRYPTOCURRENCY_DATA_ITEMS_COUNT_INDEX_PAGE,
        currentPage * config.CRYPTOCURRENCY_DATA_ITEMS_COUNT_INDEX_PAGE +
          config.CRYPTOCURRENCY_DATA_ITEMS_COUNT_INDEX_PAGE
      );
      const preparedCryptocurrencyData = TransformData.prepareIndexPageCryptocurrencyData(
        filteredCryptocurrenciesData
      );
      return preparedCryptocurrencyData;
    }
  );
};

export const makeCryptocurrencyDataByIDSelector = () => {
    return createSelector(
        [getCurrentCryptocurrencyData],
        (currentCryptocurrencyData) => {
            const preparedCryptocurrencyData = TransformData.prepareCurrentPageCryptocurrencyData(currentCryptocurrencyData);
            return preparedCryptocurrencyData;
        }
    )
}

export const makeCryptocurrencyHistoricDataSelector = () => {
  return createSelector(
    [getCryptocurrencyHistoricData],
    cryptocurrencyHistoricData => {
      const preparedCryptocurrencyHistoricData = TransformData.prepareCryptocurrencyHistoricData(cryptocurrencyHistoricData);
      return preparedCryptocurrencyHistoricData;
    }
  );
}
