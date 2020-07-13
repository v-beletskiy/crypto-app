import React from "react";
import PropTypes from "prop-types";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryAxis } from "victory";

function Chart(props) {
  const { data } = props;
  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        labels={({ datum }) => datum.y}
        style={{ data: { stroke: "#0036d0", strokeWidth: 2 } }}
        width={600}
        data={data}
      />
      <VictoryAxis
        style={{
          ticks: { stroke: "transparent" },
        }}
      />
    </VictoryChart>
  );
}

export default Chart;

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
