"use strict";

var grunt = require("grunt");

exports.strex = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read("tmp/default_options");
    var expected = grunt.file.read("test/expected/default_options");
    test.equal(actual, expected, "Unexpected result for default options.");

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read("tmp/custom_options");
    var expected = grunt.file.read("test/expected/custom_options");
    test.equal(actual, expected, "Unexpected result for custom options.");

    test.done();
  }
};
