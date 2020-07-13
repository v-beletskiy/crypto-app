/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import List from "../../components/List/List";
import { ActionType } from "../../actionTypes";
import { cryptocurrencyCurrentPageItems } from "../../data/data";
import {
  makeCryptocurrencyDataByIDSelector,
  makeCryptocurrencyHistoricDataSelector,
} from "../../selectors/selectors";
import config from "../../config";
import Chart from "../../components/shared/Chart/Chart";

const CurrencyItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h1`
  margin: 0;
  padding-bottom: 30px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const CurrencyMainDataContainer = styled.div`
  display: flex;
  & > .VictoryContainer {
    width: auto !important;
    flex-grow: 1;
  }
`;

function CurrencyItem() {
  const dispatch = useDispatch();

  const selectCryptocurrencyDataByID = useMemo(
    makeCryptocurrencyDataByIDSelector,
    []
  );

  const selectCryptocurrencyHistoricData = useMemo(
    makeCryptocurrencyHistoricDataSelector,
    []
  );

  const currentCurrency = useSelector((state) =>
    selectCryptocurrencyDataByID(state)
  );
  const cryptocurrencyHistoricData = useSelector((state) =>
    selectCryptocurrencyHistoricData(state)
  );
  const isLoading = useSelector((state) => state.app.isLoading);

  useEffect(() => {
    const currencySymbol = window.location.pathname.split("/")[2];
    if (!currentCurrency || currentCurrency.symbol !== currencySymbol) {
      dispatch({
        type: ActionType.LOAD_CRYPTOCURRENCY_BY_SYMBOL,
        payload: { symbol: currencySymbol },
      });
    }
    dispatch({
        type: ActionType.LOAD_CRYPTOCURRENCY_HISTORIC_DATA,
        payload: { symbol: currencySymbol, forDays: 7 },
      });
    setTimeout(() => {
      dispatch({
        type: ActionType.UPDATE_CRYPTOCURRENCY_BY_SYMBOL_REPEATEDLY,
        payload: { currencySymbol },
      });
    }, config.TIME_DELAY_TO_UPDATE_CRYPTOCURRENCY_DATA);
  }, []);

  return (
    <CurrencyItemContainer>
      <Header>{currentCurrency?.name}</Header>
      <CurrencyMainDataContainer>
        <List
          keyData={cryptocurrencyCurrentPageItems}
          valueData={currentCurrency}
          isUpdating={isLoading}
        />
        <Chart data={cryptocurrencyHistoricData} />
      </CurrencyMainDataContainer>
    </CurrencyItemContainer>
  );
}

export default CurrencyItem;
