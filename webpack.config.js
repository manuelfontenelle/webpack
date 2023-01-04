const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // plugin pour minifier scss
// const devMode = process.env.NODE_ENV === "production"
const devMode = process.env.NODE_ENV !== "production" // A mettre en commentaire et afficher la ligne du dessus pour minifier scss, le mode production en TRUE
// const BundleAnalyzerPlugin =
// 	require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
	mode: "production",
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/dist/",
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
			filename: "main.css",
			chunkFilename: "main-id.css",
		}),
	],
	plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin()]), // Détection dev mode pour minification Scss
	// plugins: [new BundleAnalyzerPlugin()],
	devServer: {
		static: {
			directory: path.join(__dirname, ""),
		},
		compress: true,
		port: 9000,
	},
}
