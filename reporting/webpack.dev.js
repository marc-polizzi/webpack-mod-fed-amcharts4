const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {

    mode: "development",

    entry: "./src/index.tsx",

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

        port: 3000,
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
                    test: /amcharts3[\\\/]images[\\\/].*\.(gif|png|svg)$/,
                    type: "asset/resource",
                    generator: {
                        filename: "static/media/amcharts3/images/[name][ext]",
                    }
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
            name: "reporting",
            shared: {
                "react": "^17.0.1",
                "react-dom": "^17.0.1",
                "@amcharts/amcharts4": "^4.10.13",
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
