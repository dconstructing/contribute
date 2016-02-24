var path = require("path");
var webpack = require('webpack');

module.exports = {
	entry: './src/app.jsx',
	output: {
		filename: 'build/bundle.js', //this is the default name, so you can skip it
	},
	module: {
		loaders: [
			{
				//tell webpack to use jsx-loader for all *.jsx files
				test: /\.jsx$/,
				loader: 'babel-loader',
				query: {
					presets: [
						'es2015',
						'react'
					]
				}
			}
		]
	},
	resolve: {
		root: [path.join(__dirname, "bower_components")],
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		new webpack.ResolverPlugin(
			new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
		)
	]
};
