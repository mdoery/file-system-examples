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

/*
quick test code - 
isFile("test/afile.txt").then(function(value) {
	console.log("done");
	console.log(value);
});
*/

if (typeof module !== 'undefined' && module.exports != null) {
    exports.isFile = isFile;
}