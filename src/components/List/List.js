import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-width: 50%;
  & > :nth-child(odd) {
    background-color: #fbfbfb;
  }
`;

const Row = styled.div`
  display: flex;
  padding: 10px;
  background-color: #f7f7f7;
`;

const Title = styled.div`
  width: 50%;
  font-weight: 700;
`;

const Value = styled.div`
  width: 50%;
  text-align: right;
`;

const Loader = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #757575;
  visibility: ${(props) => (props.isUpdating ? "visible" : "hidden")};
  opacity: ${(props) => (props.isUpdating ? 1 : 0)};
`;

const LoaderMessage = styled.p`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
`;

function List(props) {
  const { keyData, valueData, isUpdating } = props;
  const sortedData = keyData.map((keyEl) => {
    return {
      title: keyEl.title,
      value: valueData[keyEl.key],
    };
  });

  return (
    <ListContainer>
      {sortedData.map((el) => {
        return (
          <Row key={el.title}>
            <Title>{el.title}</Title>
            <Value>{el.value}</Value>
          </Row>
        );
      })}
      <Loader isUpdating={isUpdating}>
        <LoaderMessage>
          Currency data is being updated. Please, wait...
        </LoaderMessage>
      </Loader>
    </ListContainer>
  );
}

export default List;

List.propTypes = {
  keyData: PropTypes.arrayOf(PropTypes.object).isRequired,
  valueData: PropTypes.arrayOf(PropTypes.object).isRequired,
  isUpdating: PropTypes.bool.isRequired,
};
