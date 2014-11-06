module.exports = function( grunt ){
  grunt.initConfig({
		browserify: {
			options: {
				transform: [ require('grunt-react').browserify ]
			},
			app: {
				src: 'public/js/main.js',
				dest: 'public/js/main.dist.js'
			}
		},

    connect: {
      server: {
        options: {
          port: 3000,
          base: 'public',
          livereload: true
        }
      }
    },

		watch: {
      js: {
        files: ['public/**/**/*.js', 'public/**/*.js', '!public/js/main.dist.js'],
        tasks: ['browserify']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'public/**/**/*.js',
          'public/**/*.js',
          '!public/js/main.dist.js',
          'public/index.html'
        ]
      }

		}
  });

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask( 'dev', ['connect', 'watch'] )
	grunt.registerTask('default', ['browserify']);
};
