const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'src', 'js', 'index.js'),
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		hot: true,
		host: 'localhost',
		port: 3000,
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Portfolio Page',
			template: path.resolve(__dirname, 'src', 'index.html'),
			filename: 'index.html',
		}),
		new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				}
			},
			{

				test: /\.s[ac]ss$/i,
				exclude: /node_modules/,
				use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader, 
						'css-loader', 
						'sass-loader',
			],
			},
			{
				test: /\.html$/,
				use: 'html-loader',
			},
			{
        test: /\.png$/i,
				exclude: /favicon/,
        use: [{
					loader: 'image-webpack-loader',
					options: {
						pngquant: {
							quality: [0.05, 0.1],
						},
					},
				}],
				generator: {
					filename: 'images/[name]-[hash][ext]'
				}
      },
		]
	},
}