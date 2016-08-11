/*
 * grunt-strex
 * https://github.com/wanadev/grunt-strex
 *
 * Copyright (c) 2016 Wanadev
 * Licensed under the BSD-3-Clause license.
 */

"use strict";

var espree = require("espree");

module.exports = function(grunt) {

  /**
   * Extract all strings from the JS source file that match the provided regex.
   */
  let extractStrings = function(source, ecmaVersion, match) {
    let strings = [];
    let ast = null;

    // Parse source
    try {
        ast = espree.parse(source.toString(), {
            range: false,
            loc: false,
            comment: false,
            attachComment: false,
            tokens: true,
            ecmaVersion: ecmaVersion
        });
    }
    catch(error) {
        grunt.log.warn(error.toString());
        grunt.log.warn(`File skipped due to syntax error.`);
        return strings;
    }

    // Check all tokens
    for (let t = 0; t < ast.tokens.length; ++t) {
        let token = ast.tokens[t];
        if (token.type === "String" || token.type === "Template") {
            let string = token.value;
            if (string.match(match)) {
                strings.push(string);
            }
        }
    }

    return strings;
  };

  /**
   * Routine over all file groups of the task.
   */
  let checkFilesGroup = function(options, filesGroup) {
    let destSource = "";

    // Check all specified files
    for (let i = 0; i < filesGroup.src.length; ++i) {
      let file = filesGroup.src[i];
      if (!grunt.file.exists(file)) {
        grunt.log.warn(`Source file "${file}" not found.`);
        continue;
      }

      // Extract strings
      grunt.log.writeln(`Analyzing file "${file}".`);
      let source = grunt.file.read(file);
      let strings = extractStrings(source, options.ecmaVersion, options.match);

      // Replace all strings
      if (strings.length !== 0) {
        if (options.comment) {
          destSource += `${options.commentStart}"${file}"${options.commentEnd}`;
        }
        for (let j = 0; j < strings.length; ++j) {
          let string = strings[j].replace(options.match, options.replace);
          destSource += `${string}${options.separator}`;
        }
        destSource += `${options.fileSeparator}`;
      }
    }

    // Export to destination file
    grunt.file.write(filesGroup.dest, destSource);

    // Print a success message.
    grunt.log.writeln(`File "${filesGroup.dest}" generated.`);
  };

  /**
   * The task routine.
   */
  let multiTasks = function() {
    let options = this.options({
      match: /(.*)/,
      replace: "$1",
      separator: "\n",
      fileSeparator: "\n",
      ecmaVersion: 6,
      comment: true,
      commentStart: "// ",
      commentEnd: "\n"
    });

    this.files.forEach(checkFilesGroup.bind(undefined, options));
  };

  grunt.registerMultiTask('strex', 'Grunt plugin to extract strings from javascript files, process them and export them all to an other file.', multiTasks);
};
