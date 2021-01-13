const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    mode: "development",

    entry: "./src/index.ts",

    output: {
        chunkFilename: '[name]-chunk.js',
    },

    /**
     * amCharts 4 useless files.
     */
    externals: ({context, request}, callback) => {
        if (/xlsx|canvg|pdfmake/.test(request)) {
            return callback(null, "commonjs " + request);
        }
        callback();
    },

    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },

    devtool: "source-map",

    devServer: {

        port: 3100,
        open: true,

    },

    module: {
        rules: [{
            oneOf: [
                {
                    test: /\.tsx?$/,
                    exclude: [/node_modules/],
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/react", "@babel/env"],
                            }
                        },
                        {
                            loader: "ts-loader",
                            options: {
                                transpileOnly: true,
                            },
                        },
                    ]
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    loader: require.resolve("file-loader"),
                    exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                    options: {
                        name: "static/media/[name].[hash:8].[ext]",
                    }
                },
            ]
        }],
    },

    plugins: [

        new ModuleFederationPlugin({
            name: "charts",
            filename: "remoteEntry.js",
            exposes: {
                "./PluginDefinition": "./src/PluginDefinition",
            },
            shared: {
                "react": {
                    requiredVersion: "^17.0.1",
                    singleton: true,
                },
                "react-dom": {
                    requiredVersion: "^17.0.1",
                    singleton: true,
                },
                "@amcharts/amcharts4": {
                    requiredVersion: "^4.10.13",
                    singleton: true,
                },
            },
        }),

        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),

        new ForkTsCheckerWebpackPlugin({

            async: true,

            eslint: {
                files: "./src/**/*.{ts,tsx}"
            }

        }),

    ].filter(Boolean),

};
