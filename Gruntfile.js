module.exports = function(grunt) {
	
	require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
	//var webpackConfig = require("./webpack.config.js");
	//var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
	//var webpackDevMiddleware = require("webpack-dev-middleware");
	var webpack = require("webpack");
	
	var BUILD_TARGET_DIR  = 'dist', FINAL_BUNDLE_FILENAME = 'ui.zip',
	REMOTE_SERVICE_HOST = 'remoteserver.com';
	
	/*var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;
	var mountFolder = function (connect, dir) {
	    return connect.static(require('path').resolve(dir));
	};*/
	var prepareDevWebpackMiddleware = function() {

		/*//Uncomment this line for rich debug option while development
		//webpackConfig.devtool = "inline-source-map";
		
		webpackConfig.devtool = "eval";
		var compiler = webpack(webpackConfig);
		
		return webpackDevMiddleware(compiler, {
			publicPath : "/assets",
			stats: {
		        colors: true
		    }
		});*/
	};


	grunt.initConfig({
		
		clean: [BUILD_TARGET_DIR, FINAL_BUNDLE_FILENAME, 'test-results.xml'],

		connect: {
            options: {
                port: 8080,
                hostname: '*',
                livereload : true
            },
            proxies: [{
                context: '/api',
                host: REMOTE_SERVICE_HOST,
                changeOrigin: true,
                https: true
            }],
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            prepareDevWebpackMiddleware(),
                            //proxySnippet,
                            mountFolder(connect, 'src'),
                            mountFolder(connect, '.')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            proxySnippet,
                            mountFolder(connect, BUILD_TARGET_DIR)
                        ];
                    }
                }
            }
        },
    
		replace : {
			dist : {
				options : {
					patterns : [ {
						match : /assets\//g,
						replacement : ''
					} ]
				},
				files : [ {
					expand : true,
					flatten : true,
					src : [ 'src/index.html' ],
					dest : BUILD_TARGET_DIR
				} ]
			}
		},
        
		copy: {
	      main: {
	        files: [
              {
  	        	  cwd: 'dist/assets',
  	        	  src: ['phxapp.js', 'vendor.js', 'vendor-style.js', 'commons.js'], 
  	        	  dest: BUILD_TARGET_DIR,
  	        	  filter: 'isFile', 
  	        	  expand: true
	  	      }
	        ]
	      }
	    },
	    compress : {
			main: {
				options: {
					archive: FINAL_BUNDLE_FILENAME
			},
			files: [ 
		        { 
		        	cwd: 'dist', 
		        	src: '**', 
		        	expand:  true, 
		        	filter: 'isFile', 
		        	dest: 'web-ui/' 
		        }
		      ]
			}
	    },
	    karma: {
	    	dev: {
	    		configFile: 'test/karma.conf.js',
	    		autoWatch: false,
	    		singleRun: true
	    	},
            unit_auto: {
                configFile: 'test/karma.conf.js',
             	autoWatch: true,
		        singleRun: false
            },
		    ci: {
		    	configFile: 'test/karma.conf.js',
				browsers : [ 'PhantomJS' ],
				singleRun : true,
				autoWatch : false,
				colors: false
		    }
        },
        protractor: {
			options : {
				keepAlive : true,
				configFile : "test/config/protractor.conf.js"
			},
			singlerun : {},
			auto : {
				keepAlive : true,
				options : {
					args : {
						seleniumPort : 4444
					}
				}
			},
			ci : {
				keepAlive : true,
				options : {
					args : {
						seleniumPort : 4444
					}
				}
			}
		},
	    watch: 
	    {
			options : {
				livereload : true
			},
			server: {
                files: [
                    'src/**/*.html',
                    'src/styles/**/*.css',
                    'src/**/*.less',
                    'src/**/*.js'
                ]
            },
			protractor : {
				files : [ 'src/**/*.js', 'test/e2e/**/*_e2e.js' ],
				tasks : [ 'protractor:auto' ]
			},
			karma : {
				files : [ 'src/**/*.js', 'test/e2e/**/*_e2e.js' ],
				tasks : [ 'karma:unit_auto' ]
			}
		}
	});

	// The development server (the recommended option for development)
	grunt.registerTask("dev", ["webpack-dev-server:start"]);
	
	grunt.registerTask("default", "Usage Text for Grunt." , function(){
		 grunt.log.write('Usage\n');
		 grunt.log.write('\tgrunt [task]\n');
		 grunt.log.write('\n');
		 grunt.log.write('Options\n');
		 grunt.log.write('\t' + 'serve' +'\t\t' 	+ 'Starts dev server \n');
		 grunt.log.write('\t' + 'serve:dist' +'\t' 	+ 'Creates bundles in "dist" directory, runs local server\n');
		 //grunt.log.write('\t' + 'dev' +'\t\t' 	+ 'Starts dev server \n');
		 grunt.log.write('\t' + 'build' +'\t\t' 	+ 'Prepares web-ui.zip artifact \n');
		 grunt.log.write('\t' + 'test' +'\t\t' + 'Runs Karma unit tests - singlerun \n');
		 grunt.log.write('\t' + 'test:e2e' +'\t' + 'Runs Protractor End-to-End (e2e) tests - singlerun \n');
		 grunt.log.write('\t' + 'autotest' +'\t' + 'Runs Karma unit tests for file updates \n');
		 grunt.log.write('\t' + 'autotest:e2e' +'\t' + 'Runs Protractor e2e tests for file updates  \n');
		 grunt.log.write('\t' + 'test-ci' +'\t\t' + 'Task to execute Karma unit tests on Jenkins \n');
		 grunt.log.write('\t' + 'test-ci:e2e' +'\t' + 'Task to execute Protractor e2e tests on Jenkins \n');
	});

	// Production build
	grunt.registerTask("build", ["clean", "webpack:build", "replace:dist", "copy", "compress"]);
	
	//Karma test target for developer's dev box 
	grunt.registerTask('test', ['karma:dev']);
	grunt.registerTask('test:e2e', ['protractor:singlerun']);
	
	grunt.registerTask('autotest', ['karma:unit_auto']);
	grunt.registerTask('autotest:e2e', ['protractor:auto', 'watch:protractor']);
	
	//Karma test target for Jenkins CI 
	grunt.registerTask('test-ci', ['karma:ci']);
	grunt.registerTask('test-ci:e2e', ['protractor:ci']);

	
	 grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(["clean", "webpack:build", "replace:dist", "copy",  'configureProxies', "connect:dist:keepalive"]);
        }

        grunt.task.run([
            'configureProxies',
            'connect:livereload',
            'watch:server'
        ]);
    });
	

};