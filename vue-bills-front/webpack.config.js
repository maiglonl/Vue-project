var webpack = require('webpack');
var ExtractPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractPlugin('css/app.css');

module.exports ={
	devtool: 'source-map',
	entry: './src/js/main.js',
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		}
	},
	output: {
		path: __dirname + '/dist',
		filename: 'app.bundle.js',
		publicPath: '/dist/'
	},
	plugins: [
		new webpack.ProvidePlugin({
			'window.$': 'jquery',
			'window.jQuery': 'jquery'
		}),
		extractCSS,
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bowe_components)/,
				loader: 'babel-loader'
			},{
				test: /\.(eot|woff|woff2|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			},{
				test: /\.scss$/,
				loader: extractCSS.extract(['css-loader','sass-loader'])
			},{
				test: /\.vue$/,
				loader: 'vue-loader'
			}

		]
	},
	devServer: {
		host: 'localhost',
		inline: true,
		watchOptions: {
			poll: true,
			aggregateTimeout: 300
		}
	}
}