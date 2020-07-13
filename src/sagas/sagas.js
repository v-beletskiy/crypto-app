import { call, put, delay, all } from "redux-saga/effects";
import { ActionType } from "./../actionTypes";
import config from "./../config";
import AppService from "../services/AppService";
import { store } from "../store/store";
import { getCurrentRouteName } from "../utils/routes";
import { appRoutes } from "../data/data";

export function* getCryptocurrenciesDataPart(action) {
  const { startFrom } = action.payload;
  const data = yield call(AppService.getCryptocurrenciesDataPart, startFrom);
  if (data && data !== "error") {
    yield put({
      type: ActionType.GET_CRYPTOCURRENCIES_DATA_PART_SUCCESS,
      payload: { data },
    });
  } else {
    yield put({
      type: ActionType.ERROR_ON_FETCH,
      payload: { error: "fetch failed" },
    });
  }
}

export function* updateCryptocurrenciesDataPartRepeatedly(action) {
  const { startFrom } = action.payload;
  yield put({
    type: ActionType.SET_IS_LOADING,
    payload: { isLoading: true },
  });
  const data = yield all([
    call(AppService.getCryptocurrenciesDataPart, startFrom),
    delay(2000),
  ]);
  if (data[0] && data[0] !== "error") {
    yield put({
      type: ActionType.UPDATE_CRYPTOCURRENCIES_DATA_PART_REPEATEDLY_SUCCESS,
      payload: { data: data[0], startFrom },
    });
  } else {
    yield put({
      type: ActionType.ERROR_ON_FETCH,
      payload: { error: "fetch failed" },
    });
  }
  yield put({
    type: ActionType.SET_IS_LOADING,
    payload: { isLoading: false },
  });
  yield delay(config.TIME_DELAY_TO_UPDATE_CRYPTOCURRENCY_DATA);
  const currentPage = store.getState().app.currentPage;
  if (getCurrentRouteName() === appRoutes.INDEX) {
    yield put({
      type: ActionType.UPDATE_CRYPTOCURRENCIES_DATA_PART_REPEATEDLY,
      payload: {
        startFrom:
          currentPage * config.CRYPTOCURRENCY_DATA_ITEMS_COUNT_INDEX_PAGE + 1,
      },
    });
  }
}

export function* updateCryptocurrenciesDataForwardPagination() {
  const updatedCurrentPage = store.getState().app.currentPage + 1;
  const numberOfCryptocurrenciesData = store.getState().app.cryptocurrenciesData
    .length;
  if (
    numberOfCryptocurrenciesData <
    updatedCurrentPage * (config.CRYPTOCURRENCY_DATA_ITEMS_COUNT_INDEX_PAGE + 1)
  ) {
    const startFrom =
      updatedCurrentPage * config.CRYPTOCURRENCY_DATA_ITEMS_COUNT_INDEX_PAGE +
      1;
    const data = yield call(AppService.getCryptocurrenciesDataPart, startFrom);
    if (data && data !== "error") {
      yield put({
        type: ActionType.GET_CRYPTOCURRENCIES_DATA_PART_SUCCESS,
        payload: { data },
      });
    } else {
      yield put({
        type: ActionType.ERROR_ON_FETCH,
        payload: { error: "fetch failed" },
      });
    }
  }
  yield put({
    type: ActionType.CHANGE_PAGE,
    payload: { currentPage: updatedCurrentPage },
  });
}

export function* navigateToCryptocurrencyPage(action) {
  const { symbol, history } = action.payload;
  const cryptocurrenciesData = store.getState().app.cryptocurrenciesData;
  const currentCurrency = cryptocurrenciesData.find(
    (el) => el.symbol === symbol
  );
  if (currentCurrency && currentCurrency.symbol === symbol) {
    yield put({
      type: ActionType.UPDATE_CRYPTOCURRENCY_PAGE_SUCCESS,
      payload: { currentCurrency },
    });
  } else {
    yield* loadCryptocurrencyByID(symbol);
  }
  history.push(`/currency/${symbol}`);
}

export function* loadCryptocurrencyByID(param) {
  const symbol = typeof param === "object" ? param.payload.symbol : param;
  const data = yield call(AppService.getCryptocurrencyDataBySymbol, symbol);
  if (data && data !== "error") {
    yield put({
      type: ActionType.UPDATE_CRYPTOCURRENCY_PAGE_SUCCESS,
      payload: { currentCurrency: data[symbol] },
    });
  } else {
    yield put({
      type: ActionType.ERROR_ON_FETCH,
      payload: { error: "fetch failed" },
    });
  }
}

export function* updateCryptocurrencyItemBySymbolRepeatedly(action) {
  const { currencySymbol } = action.payload;
  yield put({
    type: ActionType.SET_IS_LOADING,
    payload: { isLoading: true },
  });
  const data = yield all([
    call(AppService.getCryptocurrencyDataBySymbol, currencySymbol),
    delay(2000),
  ]);
  if (data[0] && data[0] !== "error") {
    yield put({
      type: ActionType.UPDATE_CRYPTOCURRENCY_PAGE_SUCCESS,
      payload: { currentCurrency: data[0][currencySymbol] },
    });
  } else {
    yield put({
      type: ActionType.ERROR_ON_FETCH,
      payload: { error: "fetch failed" },
    });
  }
  yield put({
    type: ActionType.SET_IS_LOADING,
    payload: { isLoading: false },
  });
  yield delay(config.TIME_DELAY_TO_UPDATE_CRYPTOCURRENCY_DATA);
  if (getCurrentRouteName() === appRoutes.CRYPTOCURRENCY_PAGE) {
    yield put({
      type: ActionType.UPDATE_CRYPTOCURRENCY_BY_SYMBOL_REPEATEDLY,
      payload: { currencySymbol },
    });
  }
}

export function* loadCryptocurrencyHistoricData(action) {
  const { symbol, forDays } = action.payload;
  const data = yield call(
    AppService.getCryptocurrencyHistoricData,
    symbol,
    forDays
  );
  if (data && data !== "error") {
    yield put({
      type: ActionType.LOAD_CRYPTOCURRENCY_HISTORIC_DATA_SUCCESS,
      payload: { cryptocurrencyHistoricData: data },
    });
  } else {
    yield put({
      type: ActionType.ERROR_ON_FETCH,
      payload: { error: "fetch failed" },
    });
  }
}
