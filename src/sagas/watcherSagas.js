import { takeLatest } from "redux-saga/effects";
import * as Sagas from "./sagas";
import { ActionType } from "./../actionTypes";

export function* getCryptocurrenciesDataPartWatcher() {
    yield takeLatest(ActionType.GET_CRYPTOCURRENCIES_DATA_PART, Sagas.getCryptocurrenciesDataPart);
}

export function* getCryptocurrenciesDataPartRepeatedlyWatcher() {
    yield takeLatest(ActionType.UPDATE_CRYPTOCURRENCIES_DATA_PART_REPEATEDLY, Sagas.updateCryptocurrenciesDataPartRepeatedly);
}

export function* paginateForward() {
    yield takeLatest(ActionType.PAGINATE_FORWARD, Sagas.updateCryptocurrenciesDataForwardPagination);
}

export function* navigateToCryptocurrencyPage() {
    yield takeLatest(ActionType.NAVIGATE_TO_CRYPTOCURRENCY_PAGE, Sagas.navigateToCryptocurrencyPage);
}

export function* loadCryptocurrencyDataByID() {
    yield takeLatest(ActionType.LOAD_CRYPTOCURRENCY_BY_SYMBOL, Sagas.loadCryptocurrencyByID);
}

export function* updateCryptocurrencyItemBySymbolRepeatedly() {
    yield takeLatest(ActionType.UPDATE_CRYPTOCURRENCY_BY_SYMBOL_REPEATEDLY, Sagas.updateCryptocurrencyItemBySymbolRepeatedly);
}

export function* loadCryptocurrencyHistoricData() {
    yield takeLatest(ActionType.LOAD_CRYPTOCURRENCY_HISTORIC_DATA, Sagas.loadCryptocurrencyHistoricData);
}