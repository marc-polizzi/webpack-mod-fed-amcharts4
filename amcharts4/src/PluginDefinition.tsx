import React from "react";
import * as am4core from "@amcharts/amcharts4/core";

console.log("[amCharts4] options.commercialLicense :" , am4core.options.commercialLicense);
console.log("[amCharts4] options.licenses          :" , ...am4core.options.licenses);

// Adding multiple times despite Webpack Module Federation setup:
//      shared: {
//          "@amcharts/amcharts4": {singleton: true}
//      }
am4core.addLicense("CHxxxxxxxx");
am4core.options.commercialLicense = true;

console.log("[amCharts4] options.commercialLicense :" , am4core.options.commercialLicense);
console.log("[amCharts4] options.licenses          :" , ...am4core.options.licenses);

const PluginDefinition = {

    id: "amCharts4",

    registerWidgets(manager: any) {

        console.log("[amCharts4] registerWidgets")

        manager.registerWidget(<b>line-chart</b>);
        manager.registerWidget(<b>bar-chart</b>);

    }

};

export default PluginDefinition;