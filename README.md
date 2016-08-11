# grunt-strex

> Grunt plugin to extract strings from javascript files, process them and export them all to an other file.

## Getting Started
This plugin requires Grunt `~1.0.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-strex --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-strex');
```

## The "strex" task

### Overview
In your project's Gruntfile, add a section named `strex` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  strex: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.match
Type: `RegExp`
Default value: `/(.*)/`

A regular expression specifying the strings you want to match.

#### options.replace
Type: `String`
Default value: `"$1"`

A string used to replace whatever the matching string was. Follow RegExp guidelines.

#### options.separator
Type: `String`
Default value: `"\r\n"`

A string to print between each matching and replaced string.

#### options.fileSeparator
Type: `String`
Default value: `"\r\n"`

A string to print between each file string. Please note that files with no strings in it or with syntax error won't appear in the result.

#### options.ecmaVersion
Type: `Number`
Default value: `6`

The standard version used for the JS parser.

#### options.comment
Type: `Boolean`
Default value: `true`

Whether or not comments with filenames should appear in the result.

#### options.commentStart
Type: `String`
Default value: `"// "`

If comments are active, the token to print before the filename.

#### options.commentEnd
Type: `String`
Default value: `"\r\n"`

If comments are active, the token to print after the filename.

### Usage Examples

If you have a file `src/testing.js` with content:
```js 
var tags = [
  "@title Hello",
  "@name Sexy"
];
```

Using this options:
```js
grunt.initConfig({
  strex: {
    options: {
      match: /^.@(.*) (.*)./,
      replace: "$1: $2",
      separator: ", ",
      ecmaVersion: 5,
      comment: false
    },
    files: {
      'dest/result': ['src/testing'],
    },
  },
});
```

You extract all strings of the `src/testing.js` file to the resulting `dest/result`:
```
title: Hello, name: Sexy
```
