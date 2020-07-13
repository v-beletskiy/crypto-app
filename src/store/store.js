import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import appReducer from "../reducers/appReducer";
import { rootSaga } from "../sagas/rootSaga";

let initState = {};

const sagaMiddleware = createSagaMiddleware();

const createRootReducer = () =>
  combineReducers({
    app: appReducer,
  });

export const store = createStore(
  createRootReducer(),
  initState,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
