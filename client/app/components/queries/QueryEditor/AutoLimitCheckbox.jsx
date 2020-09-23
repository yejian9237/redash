import React, { useCallback } from "react";
import PropTypes from "prop-types";
import recordEvent from "@/services/recordEvent";
import Checkbox from "antd/lib/checkbox";
import Tooltip from "antd/lib/tooltip";

export default function AutoLimitCheckbox({ available, checked, onChange }) {
  const handleClick = useCallback(() => {
    recordEvent("checkbox_auto_limit", "screen", "query_editor", { state: !checked });
    onChange(!checked);
  }, [checked, onChange]);

  let tooltipMessage = null;
  if (!available) {
    tooltipMessage = "该类型数据源不可限制返回结果数。";
  } else {
    tooltipMessage = "限制返回结果集为前1000行。";
  }

  return (
    <Tooltip placement="top" title={tooltipMessage}>
      <Checkbox
        className="query-editor-controls-checkbox"
        disabled={!available}
        onClick={handleClick}
        checked={available && checked}>
        返回前1000行记录
      </Checkbox>
    </Tooltip>
  );
}

AutoLimitCheckbox.propTypes = {
  available: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
