import { ActionType } from "../actionTypes";
import config from "./../config";

const appInitialState = {
  isLoading: false,
  error: "",
  currentPage: 0,
  currentCryptocurrencyData: {},
  cryptocurrencyHistoricData: [],
  cryptocurrenciesData: [],
};

export default (state = appInitialState, action) => {
  switch (action.type) {
    case ActionType.UPDATE_CURRENT_ROUTE_NAME: {
      const { route } = action.payload;
      return { ...state, currentRouteName: route };
    }
    case ActionType.GET_CRYPTOCURRENCIES_DATA_PART_SUCCESS: {
      const { data } = action.payload;
      const cryptocurrenciesData = [...state.cryptocurrenciesData];
      cryptocurrenciesData.push(...data);
      return { ...state, cryptocurrenciesData };
    }
    case ActionType.UPDATE_CRYPTOCURRENCIES_DATA_PART_REPEATEDLY_SUCCESS: {
      const { data, startFrom } = action.payload;
      const updatedCryptocurrenciesData = [...state.cryptocurrenciesData];
      const updateStartingFromIdx = startFrom - 1;
      updatedCryptocurrenciesData.splice(
        updateStartingFromIdx,
        config.CRYPTOCURRENCY_DATA_ITEMS_COUNT_INDEX_PAGE
      );
      updatedCryptocurrenciesData.splice(updateStartingFromIdx, 0, ...data);
      return { ...state, cryptocurrenciesData: updatedCryptocurrenciesData };
    }
    case ActionType.UPDATE_CRYPTOCURRENCY_PAGE_SUCCESS: {
      const { currentCurrency } = action.payload;
      return { ...state, currentCryptocurrencyData: currentCurrency };
    }
    case ActionType.LOAD_CRYPTOCURRENCY_HISTORIC_DATA_SUCCESS: {
      const { cryptocurrencyHistoricData } = action.payload;
      return { ...state, cryptocurrencyHistoricData };
    }
    case ActionType.CHANGE_PAGE: {
      const { currentPage } = action.payload;
      return { ...state, currentPage };
    }
    case ActionType.SET_IS_LOADING: {
      const { isLoading } = action.payload;
      return { ...state, isLoading };
    }
    case ActionType.ERROR_ON_FETCH: {
      const { error } = action.payload;
      return { ...state, error };
    }
    default: {
      return state;
    }
  }
};
