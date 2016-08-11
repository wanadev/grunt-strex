/*
 * grunt-strex
 * https://github.com/wanadev/grunt-strex
 *
 * Copyright (c) 2016 Wanadev
 * Licensed under the BSD-3-Clause license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    strex: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options': ['test/fixtures/**/*.js']
        }
      },
      custom_options: {
        options: {
          match: /^.@type (.*)./,
          replace: "($1)",
          separator: ", ",
          fileSeparator: "\n",
          ecmaVersion: 6,
          comment: false
        },
        files: {
          'tmp/custom_options': ['test/fixtures/**/*.js']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'strex', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
