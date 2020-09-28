import React from "react";
import { pick } from "lodash";
import HelpTrigger from "@/components/HelpTrigger";
import Link from "@/components/Link";
import { Renderer as VisRenderer, Editor as VisEditor, updateVisualizationsSettings } from "@redash/viz/lib";
import { clientConfig } from "@/services/auth";

import countriesDataUrl from "@redash/viz/lib/visualizations/choropleth/maps/countries.geo.json";
import usaDataUrl from "@redash/viz/lib/visualizations/choropleth/maps/usa-albers.geo.json";
import subdivJapanDataUrl from "@redash/viz/lib/visualizations/choropleth/maps/japan.prefectures.geo.json";

function wrapComponentWithSettings(WrappedComponent) {
  return function VisualizationComponent(props) {
    updateVisualizationsSettings({
      HelpTriggerComponent: HelpTrigger,
      LinkComponent: Link,
      choroplethAvailableMaps: {
        countries: {
          name: "全球国家地图",
          url: countriesDataUrl,
          fieldNames: {
            name: "简称",
            name_long: "全称",
            abbrev: "缩写",
            iso_a2: "ISO代码(2字母)",
            iso_a3: "ISO代码(3字母)",
            iso_n3: "ISO代码(3数字)",
          },
        },
        usa: {
          name: "美国行政区划图",
          url: usaDataUrl,
          fieldNames: {
            name: "Name",
            ns_code: "美国ANSI编码(8字母)",
            geoid: "Geographic ID",
            usps_abbrev: "USPS Abbreviation",
            fips_code: "FIPS Code (2-character)",
          },
        },
        subdiv_japan: {
          name: "日本行政地图",
          url: subdivJapanDataUrl,
          fieldNames: {
            name: "名称",
            name_alt: "Name (alternative)",
            name_local: "Name (local)",
            iso_3166_2: "ISO-3166-2",
            postal: "Postal Code",
            type: "Type",
            type_en: "Type (EN)",
            region: "Region",
            region_code: "Region Code",
          },
        },
      },
      ...pick(clientConfig, [
        "dateFormat",
        "dateTimeFormat",
        "integerFormat",
        "floatFormat",
        "booleanValues",
        "tableCellMaxJSONSize",
        "allowCustomJSVisualizations",
        "hidePlotlyModeBar",
      ]),
    });

    return <WrappedComponent {...props} />;
  };
}

export const Renderer = wrapComponentWithSettings(VisRenderer);
export const Editor = wrapComponentWithSettings(VisEditor);
