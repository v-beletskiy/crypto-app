/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Table from "../../components/shared/Table/Table";
import { ActionType } from "../../actionTypes";
import config from "../../config";
import { cryptocurrencyIndexTableHeadItems } from "../../data/data";
import { makeCurrentPageCryptocurrencyDataSelector } from "../../selectors/selectors";

const Header = styled.h1`
  margin: 0;
  padding-bottom: 30px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const Pagination = styled.div`
  padding-top: 30px;
  display: flex;
`;

const PaginationButton = styled.button`
  padding: 10px 25px;
  color: #fff;
  background: ${(props) => (props.isDisabled ? "#d2d2d2" : "#27559a")};
  border-radius: 5px;
  cursor: ${(props) => (props.isDisabled ? "default" : "pointer")};
  pointer-events: ${(props) => (props.isDisabled ? "none" : "initial")};
  border: 0;
  outline: 0;
  &:hover {
    background: #1d437b;
  }
  &:last-child {
    margin-left: 20px;
  }
`;

const getCurrentPageHeader = (currentPage) => {
  return currentPage ? `Cryptocurrencies data (Page ${currentPage + 1})` : "Cryptocurrencies data";
}

function Index() {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentPage = useSelector((state) => state.app.currentPage);
  const isLoading = useSelector((state) => state.app.isLoading);
  const selectCurrentPageCryptocurrencyData = useMemo(
    makeCurrentPageCryptocurrencyDataSelector,
    []
  );

  const currentPageCryptocurrencyData = useSelector((state) =>
    selectCurrentPageCryptocurrencyData(state)
  );

  const handlePagination = (type) => {
    switch (type) {
      case "back": {
        dispatch({
          type: ActionType.CHANGE_PAGE,
          payload: { currentPage: currentPage - 1 },
        });
        break;
      }
      case "forward": {
        dispatch({
          type: ActionType.PAGINATE_FORWARD,
        });
        break;
      }
      default: {
        console.log("No such pagination type.");
      }
    }
  };

  const handleNavigateToCryptocurrencyPage = (symbol) => {
    dispatch({ 
      type: ActionType.NAVIGATE_TO_CRYPTOCURRENCY_PAGE,
      payload: { symbol, history },
     });
  }

  useEffect(() => {
    dispatch({
      type: ActionType.GET_CRYPTOCURRENCIES_DATA_PART,
      payload: { startFrom: 1 },
    });
    setTimeout(() => {
      dispatch({ type: ActionType.UPDATE_CRYPTOCURRENCIES_DATA_PART_REPEATEDLY, payload: { startFrom: 1 } });
    }, config.TIME_DELAY_TO_UPDATE_CRYPTOCURRENCY_DATA);
  }, []);

  return (
    <>
      <Header>{getCurrentPageHeader(currentPage)}</Header>
      <Table
        headItems={cryptocurrencyIndexTableHeadItems}
        bodyData={currentPageCryptocurrencyData}
        isUpdating={isLoading}
        onRowClick={(id) => handleNavigateToCryptocurrencyPage(id)}
      />
      <Pagination>
        <PaginationButton
          isDisabled={!currentPage}
          onClick={() => handlePagination("back")}
        >{`Prev ${config.CRYPTOCURRENCY_DATA_ITEMS_COUNT_INDEX_PAGE}`}</PaginationButton>
        <PaginationButton
          onClick={() => handlePagination("forward")}
        >{`Next ${config.CRYPTOCURRENCY_DATA_ITEMS_COUNT_INDEX_PAGE}`}</PaginationButton>
      </Pagination>
    </>
  );
}

export default Index;
