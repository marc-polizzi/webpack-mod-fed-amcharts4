import React from "react";
import ReactDOM from "react-dom";
import PluginDefinition from "./PluginDefinition";

ReactDOM.render(
    <div>{"Exporting the plugin : " + PluginDefinition.id}</div>,
    document.getElementById("info")
);
