# webpack-mod-fed-amcharts4

amCharts v4 module federation demo: issue w/ shared/singleton setup

        new ModuleFederationPlugin({
            name: "amCharts4",
            filename: "remoteEntry.js",
            exposes: {
                "./PluginDefinition": "./src/PluginDefinition",
            },
            shared: {
                "react": "^17.0.1",
                "react-dom": "^17.0.1",
                "@amcharts/amcharts4": "^4.10.13",
            },
        }),

while React library is loaded once, amCharts 4 is loaded twice.

![WMF](./wmf.png?raw=true "WMF")