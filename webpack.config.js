const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin") // plugin pour minifier scss

const devMode = process.env.NODE_ENV !== "production"

module.exports = {
	entry: {
		main: "./src/index.js",
	},
	output: {
		filename: "build.js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/dist/",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					// fallback to style-loader in development
					process.env.NODE_ENV !== "production"
						? "style-loader"
						: MiniCssExtractPlugin.loader,
					{
						loader: "css-loader", // translates CSS into CommonJS
						options: { importLoaders: 1 },
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"autoprefixer",
										{
											// Options
										},
									],
								],
							},
						},
					},
					{
						loader: "sass-loader", // compiles Sass to CSS
					},
				],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
						plugins: ["@babel/plugin-proposal-object-rest-spread"],
					},
				},
			},
		],
	},

	plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin()]),

	plugins: [
		new MiniCssExtractPlugin({
			filename: "./css/style.css",
			chunkFilename: "[id].css",
		}),
	],

	devServer: {
		static: {
			directory: path.join(__dirname, ""),
		},
		compress: true,
		port: 9000,
	},
}
