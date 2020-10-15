import { filter, includes, map } from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Select } from "@/components/visualizations/editor";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

const allChartTypes = [
  { type: "line", name: "线形图(Line)", icon: "line-chart" },
  { type: "column", name: "条形图(Bar)", icon: "bar-chart" },
  { type: "area", name: "面积图(Area)", icon: "area-chart" },
  { type: "pie", name: "饼形图(Pie)", icon: "pie-chart" },
  { type: "scatter", name: "散点图(Scatter)", icon: "circle-o" },
  { type: "bubble", name: "气泡图(Bubble)", icon: "circle-o" },
  { type: "heatmap", name: "热力图(Heatmap)", icon: "th" },
  { type: "box", name: "箱线图(Box)", icon: "square-o" },
];

export default function ChartTypeSelect({ hiddenChartTypes, ...props }) {
  const chartTypes = useMemo(() => {
    const result = [...allChartTypes];

    if (visualizationsSettings.allowCustomJSVisualizations) {
      result.push({ type: "custom", name: "自定义(Custom)", icon: "code" });
    }

    if (hiddenChartTypes.length > 0) {
      return filter(result, ({ type }) => !includes(hiddenChartTypes, type));
    }

    return result;
  }, []);

  return (
    <Select {...props}>
      {map(chartTypes, ({ type, name, icon }) => (
        <Select.Option key={type} value={type} data-test={`Chart.ChartType.${type}`}>
          <i className={`fa fa-${icon}`} style={{ marginRight: 5 }} />
          {name}
        </Select.Option>
      ))}
    </Select>
  );
}

ChartTypeSelect.propTypes = {
  hiddenChartTypes: PropTypes.arrayOf(PropTypes.oneOf(map(allChartTypes, "type"))),
};

ChartTypeSelect.defaultProps = {
  hiddenChartTypes: [],
};
