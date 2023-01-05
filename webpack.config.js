const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // plugin pour minifier scss
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const devMode = process.env.NODE_ENV !== "production"

module.exports = {
	entry: {
		main: "./src/index.js",
	},
	output: {
		filename: "build.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/dist/",
		// clean: true,
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					devMode ? "style-loader" : MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 2,
							sourceMap: true,
						},
					},
					{
						loader: "postcss-loader",
					},
					{
						loader: "sass-loader",
						options: { sourceMap: true },
					},
				],
			},
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "./css/style.css",
			chunkFilename: "[id].css",
		}),
	],

	plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin()]),

	devServer: {
		static: {
			directory: path.join(__dirname, ""),
		},
		compress: true,
		port: 9000,
	},
}
