import PluginDefinition from "./PluginDefinition";

const elem = document.getElementById("info");
elem && (elem.innerHTML = "Exporting the plugin : " + PluginDefinition.id);
