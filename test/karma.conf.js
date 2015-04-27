module.exports = function(config) {
	

    config.set({
 
        // base path, that will be used to resolve files and exclude
        basePath: '../',
 
        // frameworks to use
        frameworks: ['jasmine'],
 
        // list of files / patterns to load in the browser
        files: [
           	'bower_components/angular/angular.js', 
           	'bower_components/angular-ui-router/release/angular-ui-router.js', 
	        'bower_components/angular-resource/angular-resource.js', 
	        'bower_components/angular-bootstrap/ui-bootstrap.js', 

	        'bower_components/angular-mocks/angular-mocks.js',
	        
	        'src/app.js',
            'test/**/*_test.js'
        ],
 
        preprocessors: {
	    	// add webpack as preprocessor
        	'src/app.js' : ["webpack", 'sourcemap'],
        	'test/**/*_test.js' : ["webpack", 'sourcemap']
        },
        //webpack: webpackConfig, 
          webpack: {

            //Enable console:true for webpack debug log
        	console: true,

              module: {
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
                  { test: /\.jpg$/, loader: "file-loader" }
              ]
            },
            resolve: {
        		modulesDirectories: ['node_modules', 'bower_components', 'src', 'vendor', 'test'],
        		extensions: ['', '.js', '.json', '.coffee'], 
        		alias: {
        			jquery: 'jquery/dist/jquery',
                    angular: 'angular/angular'
                    	 
        		}
        	},
        	
        	devtool: "eval-source-map",
			debug: true
        },
        
        webpackServer: {
        	quiet: true,
            // webpack-dev-server configuration
            // webpack-dev-middleware configuration
            // i. e.
            stats: {
    			colors: true
    		}
        },

        webpackPort: 5556,
        
        // list of files to exclude
        exclude: [ ],
 
        // test results reporter to use
        reporters: ['progress', 'junit'],
 
        // web server port
        port: 5555,
        
        // the port used by the webpack-dev-server
        // defaults to "config.port" + 1
        //webpackPort: 1234,
 
        // enable / disable colors in the output (reporters and logs)
        colors: true,
 
        // level of logging
        logLevel: config.LOG_INFO,
 
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
 
        // Start these browsers
        browsers: ['Chrome'],
        //browsers: ['PhantomJS '],
 
        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
 
        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,
        
        junitReporter : {
        	outputFile: 'test-results.xml'
        }
        
        
       /*plugins: [ 
                require("karma-webpack"),
                require("karma-jasmine"),
                require("karma-phantomjs-launcher"),
                require("karma-junit-reporter")]  
*/
        
    });
};