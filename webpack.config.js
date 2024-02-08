const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './index.ts',
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(s(a|c)ss)$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		publicPath: '/',
		path: __dirname + '/dist',
		path: path.resolve(__dirname, './dist'),
	},
	devServer: {
		static: {
			directory: path.join(__dirname, './dist'),
		},
		compress: true,
		port: 9000,
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
	],
};
