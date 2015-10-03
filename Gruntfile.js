module.exports = function(grunt){

	grunt.initConfig({
		jshint: {
			all: [
				'app/webroot/js/*.js',
				'!app/webroot/js/dist.min.js',
				'!app/webroot/js/dist.js'
			]
		},

		uglify: {
			dist: {
				files: {
					'www/dist.min.js': [
						'www/jquery/dist/jquery.js',
						'www/angular/angular.js',
						'www/angular-*/angular-*.js',
						'www/bootstrap/dist/js/bootstrap.js',
						'www/gsap/src/uncompressed/TweenMax.js',
						'www/history.js/scripts/bundled-uncompressed/html5/native.history.js'
					]
				}
			}
		},

		cssmin: {
			combine: {
				files: {
					'app/webroot/css/dist.min.css': ['app/webroot/lib/bootstrap/dist/css/bootstrap.css', 'app/webroot/css/*.css', '!app/webroot/css/dist.min.css']
				}
			}
		},

		watch: {
			all: {
				files: ['app/**/*.*', '!app/tmp/**/*'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['app/webroot/**/*.js', '!app/webroot/js/*.min.js'],
				tasks: ['jshint', 'uglify'],
				options: { spawn: false	}
			},
			css: {
				files: ['app/webroot/**/*.css', '!app/webroot/css/*.min.css', '!app/webroot/css/dist.min.css'],
				tasks: ['cssmin', 'replace'],
				options: { spawn: false	}
			}
		},

		phpcs: {
			application: {
				dir: ['app/Controller/*.php']
			},
			options: {
				bin: 'Vendor/bin/phpcs',
				standard: 'Zend'
			}
		},

		imagemin: {														// Task
			dist: {												 		// Another target
				files: [{
					expand: true,										// Enable dynamic expansion
					cwd: 'app/webroot/img',							 	// Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}', '!min/*.{png,jpg,gif}'],				// Actual patterns to match
					dest: 'app/webroot/img/min/'						// Destination path prefix
				}]
			}
		},

		replace: {
			dist: {
				src: ['app/webroot/css/dist.min.css'],
				overwrite: true,								 // overwrite matched source files
				replacements: [{
					from: "img/",
					to: "img/min/"
				}]
			}
		},


		// Install-vagrant-box
		curl: {
			'lamp-stack.zip': 'http://github.com/MiniCodeMonkey/Vagrant-LAMP-Stack/archive/master.zip',
		},

		unzip: {
			lamp: 'lamp-stack.zip'
		},

		copy: {
			main: {
				files: [
					{expand: true, cwd: 'lamp/Vagrant-LAMP-Stack-master/', src: ['**'], dest: ''}
				]
			}
		},

		remove: {
			options: {
				trace: true
			},
			fileList: ['lamp-stack.zip'],
			dirList: ['lamp']
		},

		clean : {
			vagrant : {
				src : [ "lamp-stack.zip", 
						"lamp/**/*",
						"lamp"
				]
			}
		},

		shell: {								// Task
			vagrantUp: {
				command: 'vagrant up'
			}
		},

		open : {
			custom: {
				path : function () {
				  return 'http://golf-nantes-sud.local';
				} 
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-phpcs');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-curl');
	grunt.loadNpmTasks('grunt-zip');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-restart-vagrant');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-open');

	//grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'imagemin', 'replace', 'shell', 'open', 'watch']);
	grunt.registerTask('default', []);
	grunt.registerTask('install-vagrant-box', ['curl', 'unzip', 'copy', 'clean', 'shell']);
}