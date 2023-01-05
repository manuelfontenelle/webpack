const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // plugin pour passer scss en css

// const devMode = process.env.NODE_ENV === "production" // activer pour BUILD ( css/js minifiés) == npm run build
const devMode = process.env.NODE_ENV !== "production" // A mettre en mode DEV pour utiliser Sass + serveur == npm run dev

module.exports = {
	// mode: "development", deja present dans package.json dans == 	"build": "webpack --mode production",
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
			// chunkFilename: "main-id.css",
		}),
	],
	plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin()]), // Détection dev mode pour minification Scss

	devServer: {
		static: {
			directory: path.join(__dirname, ""),
		},
		compress: true,
		port: 9000,
	},
}
