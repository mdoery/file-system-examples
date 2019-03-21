"use strict"
var assert = require('assert');
var fileOps = require('../index');
var isFile = fileOps.isFile;

describe('test when input is a file', function() {
  describe('#isFile()', function() {
    it('should return true when input is a file', function() {
      var fn = "./test/afile.txt";
      return isFile(fn).then(function(value) {
        assert.equal(value, true);
      }).catch(function(err) {
        throw new Error('Unexpected error condition; file should exist: ' + fn);
      });
    });
  });
});

describe('test when input does not exist as a file', function() {
  describe('#isFile()', function() {
    it('should return true when input is a file', function() {
      var fn = "./test/notafile.txt";
      return isFile(fn).then(function(value) {
        throw new Error('Unexpected error condition: file should NOT exist: ' + fn);
      }).catch(function(err) {
        // Check for the specific error message.
        assert.equal(err.message.indexOf('ENOENT: no such file or directory, stat'), 0,
          "Expected ENOENT error, but got '" + err.message + "'");
      });
    });
  });
});
