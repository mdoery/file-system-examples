"use strict"
var fs = require('fs');

var isFilePromise = function(filename, resolve, reject) {
	var result = fs.stat(filename, function(err, stats) {
		if (err) {
			reject(err);
		} else {
			resolve(stats.isFile());
		}
	});
}

var copyFilePromise = function(fromFilename, toFilename, resolve, reject) {
	var result = fs.copyFile(fromFilename, toFilename, fs.constants.COPYFILE_EXCL, function(err, result) {
		console.log("result = " + result);
		if (err) {
			reject(err);
		} else {
			resolve();
		}
	});
}

/**
 * @param {String} name of file to test for existence
 * @return {Boolean} true if input file name refers to a file, otherwise false.
 */
var isFile = (filename) => new Promise(function(resolve, reject) {
	// You can remove setTimeout. I put it there to be sure that async is working.
	setTimeout(function() {
		isFilePromise(filename, resolve, reject);
	}, 1000);
})

/**
 * Copy the file named fromFilename to the file named toFilename. Will fail
 * if toFilename already exists.
 * @param {String} fromFilename
 * @param {String} toFilename
 */
var copyFile = (fromFilename, toFilename) => new Promise(function(resolve, reject) {
	setTimeout(function() {
		copyFilePromise(fromFilename, toFilename, resolve, reject);
	}, 1000);
})

/*
quick test code - 
isFile("test/afile.txt").then(function(value) {
	console.log("done");
	console.log(value);
});
*/
/*
copyFile("test/afile.txt", "test/afile1.txt").then(function(value) {
	console.log("done");
	console.log(value);
}).catch(function(err) {
	console.log(err);
});
*/
if (typeof module !== 'undefined' && module.exports != null) {
	exports.isFile = isFile;
	exports.copyFile = copyFile;
}