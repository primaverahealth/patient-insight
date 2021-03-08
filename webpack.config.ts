// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import path from "path";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import webpack from "webpack";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const config: webpack.Configuration = {
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        library: 'PatientInsight',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    devServer: {
        contentBase: path.join(__dirname, "build"),
        compress: true,
        port: 3000,
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
            eslint: {
                files: "./src/**/*",
            },
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
};

export default config;
