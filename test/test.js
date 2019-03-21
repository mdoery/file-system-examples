"use strict"
var assert = require('assert');
var fileOps = require('../index');
var isFile = fileOps.isFile;
var copyFile = fileOps.copyFile;

/*****************\
| Tests of isFile |
\*****************/
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

/*******************\
| Tests of copyFile |
\*******************/
describe('test when input to-file does not exist', function() {
  describe('#copyFile()', function() {
    it('should return true when copy-to file does not exist', function() {
      var toFilename = "./test/afile1.txt";
      var fromFilename = "./test/afile.txt";
      return copyFile(fromFilename, toFilename).then(function(value) {
        assert.strictEqual(value, undefined);
      }).catch(function(err) {
        throw new Error('Unexpected error condition; copy-to file should not exist: ' + toFilename);
      });
    });
  });
});

describe('test when input to-file does exist', function() {
  describe('#copyFile()', function() {
    it('should fail when copying over existing file', function() {
      var toFilename = "./test/afile.txt";
      var fromFilename = "./test/afile.txt";
      return copyFile(fromFilename, toFilename).then(function(value) {
        throw new Error('Unexpected error condition: should not be able to copy');
      }).catch(function(err) {
        // Check for the specific error message.
        assert.equal(err.message.indexOf('EEXIST: file already exists'), 0,
          "Expected EEXIST error, but got '" + err.message + "'");
      });
    });
  });
});
