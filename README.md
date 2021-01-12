# webpack-mod-fed-amcharts4

amCharts v4 module federation demo: issue w/ shared/singleton setup

        new ModuleFederationPlugin({
            name: "amCharts4",
            filename: "remoteEntry.js",
            exposes: {
                "./PluginDefinition": "./src/PluginDefinition",
            },
            shared: {
                "@amcharts/amcharts4": {singleton: true},
            },
        }),

![WMF](./wmf.png?raw=true "WMF")