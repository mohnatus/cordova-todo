const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: process.env.mode || 'production',
	entry: {
		main: path.resolve(__dirname, './src/index.js'),
	},
  resolve: {
    extensions: ['.vue', '.js', '.css', '.scss'],
  },
	output: {
		publicPath: '',
		path: path.resolve(__dirname, './www'),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				sideEffects: true,
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
			},
			{
				test: /\.s?css$/,
				use: [
					process.env.NODE_ENV !== 'production'
						? 'style-loader'
						: MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
			},
			{
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Cordova Todo App',
			template: path.resolve(__dirname, './src/index.html'),
			filename: 'index.html',
		}),
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
	],
};
