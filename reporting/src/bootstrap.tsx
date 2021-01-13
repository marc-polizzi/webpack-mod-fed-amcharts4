import React from "react";
import ReactDOM from "react-dom";
import * as am4core from "@amcharts/amcharts4/core";
import {RemotePluginUtils} from "./RemotePluginUtils";


console.log("[reporting] options.commercialLicense :", am4core.options.commercialLicense);
console.log("[reporting] options.licenses          :", ...am4core.options.licenses);

// Adding multiple times despite Webpack Module Federation setup:
//      shared: {
//          "@amcharts/amcharts4": {singleton: true}
//      }
am4core.addLicense("CHXXXXXXXX");
am4core.options.commercialLicense = true;

console.log("[reporting] options.commercialLicense :", am4core.options.commercialLicense);
console.log("[reporting] options.licenses          :", ...am4core.options.licenses);

const plugin = {
    url: "http://localhost:3100/remoteEntry.js",
    scope: "amCharts4",
    module: "./PluginDefinition",
};

RemotePluginUtils.setupRemotePlugin(plugin, (widgets: any[]) => {

    ReactDOM.render(
        <>
            <div>{"Imported plugin(s):"}</div>
            <ul>
                {widgets.map((widget, index) => <li key={index}>{widget}</li>)}
            </ul>
        </>,
        document.getElementById("info")
    );


});

