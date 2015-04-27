var path = require("path");
var webpack = require("webpack");

var projectRoot = path.join(__dirname);
var appRoot = path.join(path.join(__dirname), "src");
var bowerRoot = path.join(__dirname ,"bower_components");

module.exports = {
    contentBase: projectRoot, //TODO not working
    context: projectRoot,
    cache: true,
    entry: {
        ngmailclient: path.join(appRoot, 'app.js'),
        thirdparty : ['angular/angular',
            'angular-ui-router/release/angular-ui-router',
            'angular-resource/angular-resource',
            'bootstrap/dist/js/bootstrap'
        ],
        'bootstrap-styles' : ['bootstrap/less/bootstrap.less']

    },
    output: {
        path: path.join(projectRoot, '/bundles'),
        publicPath: "/bundles/",
        filename: "[name].js",
        chunkFilename: "[id].[chunkhash].js"
    },
    module: {
        noParse: [
            /\.\/bower_components\/+/
        ],
        loaders: [
            // required to write "require('./style.css')"
            { test: /\.css$/,    loader: "style-loader!css-loader" },
            { test: /\.less$/, 	 loader: "style-loader!css-loader!less-loader" },

            // required for bootstrap icons
            { test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
            { test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
            { test: /\.eot$/,    loader: "file-loader?prefix=font/" },
            { test: /\.svg$/,    loader: "file-loader?prefix=font/" },

            //required for images file loaders
            { test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png" },
            { test: /\.jpg$/, loader: "file-loader" },
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components', 'src'],
        alias: {
            jquery: 'jquery/dist/jquery',
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$" : "jquery",
            "jQuery" : "jquery",
        })
    ]
};