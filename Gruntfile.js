/*global module:false*/
module.exports = function(grunt) {
	require('time-grunt')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
		  '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
		  '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>',
		sass: {
			dist : {
				options : {
					require : [ 'bourbon', 'neat', 'sass-globbing' ],
					sourceMap: false
				},
				files : [ {
					expand : true,
					flatten : true,
					cwd : 'assets/scss',
					src : [
						'**/*.scss',
						'!**/_*.scss',
						'!pattern-library.scss'
					],
					dest : 'assets/css/',
					ext : '.css'
				} ]
			}
		},
		coffee : {
			dist : {
				files : [ {
					expand : true,
					flatten : true,
					cwd : 'assets/coffee',
					src : ['**/*.coffee'],
					dest : 'assets/js/',
					ext : '.js'
				} ]
			}
		},
		watch: {
			dist : {
				files: [
					'assets/scss/**/*.scss'
				],
				tasks: ['sass','concat'],
				options: {
					livereload: true
				}
			}
		},
		concat : {
			options : {
				separator : ';'
			},
			dist : {
				files : {
					'assets/js/build.js' : [
						'assets/js/vendor/*.js',
						'assets/js/*.js',
						'!assets/js/build.js',
						'!assets/js/build.min.js',
						'!assets/js/vendor/jquery.min.js'
					]
				}
			}
		},
		uglify : {
			dist : {
				files : {
					'assets/js/build.min.js' : [ 'assets/js/build.js' ]
				}
			}
		},
		cssmin : {
			dist : {
				files : {
					'assets/css/styles.min.css' : [ 'assets/css/styles.css' ]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['default','concat','cssmin']);
};
