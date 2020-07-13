import React from "react";
import { Provider } from "react-redux";
import "./styles/normalize.scss";
import styled from "styled-components";
import { store } from "./store/store";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import CurrencyItem from "./pages/CurrencyItem/CurrencyItem";
import Index from "./pages/Index/Index";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 15px;
`;

function App() {
  return (
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route
              path="/currency/:currencySymbol"
              exact
              component={CurrencyItem}
            />
            <Route path="/" exact component={Index} />
          </Switch>
        </Router>
      </Provider>
    </AppContainer>
  );
}

export default App;
