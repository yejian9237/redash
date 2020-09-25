import { map } from "lodash";
import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useDebouncedCallback } from "use-debounce";
import * as Grid from "antd/lib/grid";
import {
  Section,
  Select,
  Input,
  Checkbox,
  TextArea,
  TextAlignmentSelect,
  ContextHelp,
} from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";

import useLoadGeoJson from "../hooks/useLoadGeoJson";
import { getGeoJsonFields } from "./utils";

function TemplateFormatHint({ geoJsonProperties }) {
  return (
    <ContextHelp placement="topLeft" arrowPointAtCenter>
      <div style={{ paddingBottom: 5 }}>
        <div>
          All query result columns can be referenced using <code>{"{{ column_name }}"}</code> syntax.
        </div>
        <div>
          Use <code>{"{{ @@value }}"}</code> to access formatted value.
        </div>
      </div>
      {geoJsonProperties.length > 0 && (
        <React.Fragment>
          <div className="p-b-5">GeoJSON properties could be accessed by these names:</div>
          <div style={{ maxHeight: 300, overflow: "auto" }}>
            {map(geoJsonProperties, property => (
              <div key={property}>
                <code>{`{{ @@${property}}}`}</code>
              </div>
            ))}
          </div>
        </React.Fragment>
      )}
    </ContextHelp>
  );
}

TemplateFormatHint.propTypes = {
  geoJsonProperties: PropTypes.arrayOf(PropTypes.string),
};

TemplateFormatHint.defaultProps = {
  geoJsonProperties: [],
};

export default function GeneralSettings({ options, onOptionsChange }) {
  const [onOptionsChangeDebounced] = useDebouncedCallback(onOptionsChange, 200);
  const [geoJson] = useLoadGeoJson(options.mapType);
  const geoJsonFields = useMemo(() => getGeoJsonFields(geoJson), [geoJson]);

  const templateFormatHint = <TemplateFormatHint geoJsonProperties={geoJsonFields} />;

  return (
    <div className="choropleth-visualization-editor-format-settings">
      <Section>
        <Grid.Row gutter={15}>
          <Grid.Col span={12}>
            <Input
              label={
                <React.Fragment>
                  显示值格式
                  <ContextHelp.NumberFormatSpecs />
                </React.Fragment>
              }
              data-test="Choropleth.Editor.ValueFormat"
              defaultValue={options.valueFormat}
              onChange={event => onOptionsChangeDebounced({ valueFormat: event.target.value })}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Input
              label="显示值提示信息"
              data-test="Choropleth.Editor.ValuePlaceholder"
              defaultValue={options.noValuePlaceholder}
              onChange={event => onOptionsChangeDebounced({ noValuePlaceholder: event.target.value })}
            />
          </Grid.Col>
        </Grid.Row>
      </Section>

      <Section>
        <Checkbox
          data-test="Choropleth.Editor.LegendVisibility"
          checked={options.legend.visible}
          onChange={event => onOptionsChange({ legend: { visible: event.target.checked } })}>
          显示图例
        </Checkbox>
      </Section>

      <Section>
        <Grid.Row gutter={15}>
          <Grid.Col span={12}>
            <Select
              label="图例位置"
              data-test="Choropleth.Editor.LegendPosition"
              disabled={!options.legend.visible}
              defaultValue={options.legend.position}
              onChange={position => onOptionsChange({ legend: { position } })}>
              <Select.Option value="top-left" data-test="Choropleth.Editor.LegendPosition.TopLeft">
                顶部 / 左边
              </Select.Option>
              <Select.Option value="top-right" data-test="Choropleth.Editor.LegendPosition.TopRight">
                顶部 / 右边
              </Select.Option>
              <Select.Option value="bottom-left" data-test="Choropleth.Editor.LegendPosition.BottomLeft">
                底部 / 左边
              </Select.Option>
              <Select.Option value="bottom-right" data-test="Choropleth.Editor.LegendPosition.BottomRight">
                底部 / 右边
              </Select.Option>
            </Select>
          </Grid.Col>
          <Grid.Col span={12}>
            <TextAlignmentSelect
              data-test="Choropleth.Editor.LegendTextAlignment"
              label="图例文本对齐"
              disabled={!options.legend.visible}
              defaultValue={options.legend.alignText}
              onChange={event => onOptionsChange({ legend: { alignText: event.target.value } })}
            />
          </Grid.Col>
        </Grid.Row>
      </Section>

      <Section>
        <Checkbox
          data-test="Choropleth.Editor.TooltipEnabled"
          checked={options.tooltip.enabled}
          onChange={event => onOptionsChange({ tooltip: { enabled: event.target.checked } })}>
          显示提示信息
        </Checkbox>
      </Section>

      <Section>
        <Input
          label={<React.Fragment>提示信息模板 {templateFormatHint}</React.Fragment>}
          data-test="Choropleth.Editor.TooltipTemplate"
          disabled={!options.tooltip.enabled}
          defaultValue={options.tooltip.template}
          onChange={event => onOptionsChangeDebounced({ tooltip: { template: event.target.value } })}
        />
      </Section>

      <Section>
        <Checkbox
          data-test="Choropleth.Editor.PopupEnabled"
          checked={options.popup.enabled}
          onChange={event => onOptionsChange({ popup: { enabled: event.target.checked } })}>
          显示弹出信息
        </Checkbox>
      </Section>

      <Section>
        <TextArea
          label={<React.Fragment>弹出信息模板 {templateFormatHint}</React.Fragment>}
          data-test="Choropleth.Editor.PopupTemplate"
          disabled={!options.popup.enabled}
          rows={4}
          defaultValue={options.popup.template}
          onChange={event => onOptionsChangeDebounced({ popup: { template: event.target.value } })}
        />
      </Section>
    </div>
  );
}

GeneralSettings.propTypes = EditorPropTypes;
