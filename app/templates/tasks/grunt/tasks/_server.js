module.exports = function (grunt) {
    'use strict';
    grunt.registerTask('server', 'Start a custom web server.', function() {
	 	var http = require("http"),
		    url = require("url"),
		    path = require("path"),
		    fs = require("fs"),
		    root = "web",
		    port = 8888;

		http.createServer(function(request, response) {

		  var uri = url.parse(request.url).pathname;
		  var filename = path.join(process.cwd(), root, uri);

		  var contentTypesByExtension = {
		    '.html': "text/html",
		    '.css':  "text/css",
		    '.js':   "text/javascript",
		    ".svg":  "image/svg+xml",
		    ".jpg": "image/jpeg",
		    ".jpeg": "image/jpeg",
		    ".png": "image/png",
		    ".gif": "image/gif"
		  };

		  fs.exists(filename, function(exists) {
		    if (!exists) {
		      response.writeHead(404, {"Content-Type": "text/plain"});
		      response.write("404 Not Found\n");
		      response.end();
		      return;
		    }

		    if (fs.statSync(filename).isDirectory()) {
		    	filename += '/index.html';
		    }

		    fs.readFile(filename, "binary", function(err, file) {
		      if (err) {        
		        response.writeHead(500, {"Content-Type": "text/plain"});
		        response.write(err + "\n");
		        response.end();
		        return;
		      }

		      var headers = {};
		      var contentType = contentTypesByExtension[path.extname(filename)];
		      if (contentType) headers["Content-Type"] = contentType;
		      response.writeHead(200, headers);
		      response.write(file, "binary");
		      response.end();
		    });
		  });
		}).listen(port);

		console.log("Static file server running at http://localhost:" + port);
	});
};
