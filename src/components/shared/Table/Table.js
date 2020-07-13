import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Head = styled.div`
  display: flex;
  & > div {
    width: ${(props) => 100 / props.numberOfColumns}%;
  }
`;

const HeadItem = styled.div`
  text-align: left;
  padding: 0 10px 15px;
  font-size: 18px;
  font-weight: 700;
`;

const TableBody = styled.div`
  position: relative;
  border-radius: 10px;
  box-shadow: 0 0 20px #f1f1f1;
  & > :nth-child(even) {
    background-color: #f7f7f7;
  }
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

const TableRow = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0;
  font-size: 20px;
  & > div {
    width: ${(props) => 100 / props.numberOfColumns}%;
  }
  cursor: pointer;
`;

const TableCell = styled.div`
  padding: 0 10px;
  font-size: 16px;
  color: #353535;
`;

function Table(props) {
  const { headItems, bodyData, onRowClick, isUpdating } = props;
  return (
    <TableContainer>
      <Head numberOfColumns={headItems.length}>
        {headItems.map((item) => (
          <HeadItem key={item.key}>{item.title}</HeadItem>
        ))}
      </Head>
      <TableBody>
        {bodyData.map((item) => {
          const sortedRowData = [];
          Object.keys(item).forEach((key) => {
            const idx = headItems.findIndex((el) => el.key === key);
            if (idx !== -1) {
              sortedRowData[idx] = item[key];
            }
          });
          return (
            <TableRow
              numberOfColumns={headItems.length}
              onClick={() => onRowClick(item.symbol)}
              key={item.id}
            >
              {sortedRowData.map((el) => {
                return <TableCell key={el}>{el}</TableCell>;
              })}
            </TableRow>
          );
        })}
        <Loader isUpdating={isUpdating}>
          <LoaderMessage>
            Currency data is being updated. Please, wait...
          </LoaderMessage>
        </Loader>
      </TableBody>
    </TableContainer>
  );
}

export default Table;

Table.propTypes = {
  headItems: PropTypes.arrayOf(PropTypes.string).isRequired,
  bodyData: PropTypes.arrayOf(PropTypes.array).isRequired,
  isUpdating: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
};
