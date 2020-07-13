import { all } from "redux-saga/effects";
import * as watcherSagas from "./watcherSagas";

const watcherSagasArr = Object.entries(watcherSagas).map(entry => entry[1]);

export function* rootSaga() {
  yield all(watcherSagasArr.map(watcherSaga => watcherSaga()));
}
