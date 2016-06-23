'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var http = require('http');
var middleware = require('./proxy');
var configUpdater = require('./config-updater');

function browserSyncInit(baseDir, files, browser, notify) {
  browser = browser === undefined ? 'default' : browser;
  notify = notify === undefined ? true : notify;

  browserSync.instance = browserSync.init(files, {
    startPath: '/index.html',
    server: {
      baseDir: baseDir,
      middleware: middleware
    },
    browser: browser,
    port: 9000,
    notify: notify
  });

  var sendResponse = function(response, data) {
    data = {
      code: data.code || 500,
      message: data.message || 'Internal server error'
    };
    response.writeHead(data.code);
    response.end(JSON.stringify(data));
  };

  var server = http.createServer(function(request, response) {
    if (request.method == 'POST') {
      var body = '';
      request.on('data', function(data) {
        body += data;
      });
      request.on('end', function () {
        var post = JSON.parse(body);
        new configUpdater(post, response, sendResponse);
      });
    } else {
      sendResponse(response, {
        code: 403,
        message: 'Only POST values are allowed'
      });
    }
  });
  server.listen(9001);
}

gulp.task('serve', ['watch', 'config'], function () {
  browserSyncInit([
    'app'
  ], [
    'app/**/*.css',
    'app/*.html',
    'app/**/*.html',
    'app/**/*.js'
  ]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit('dist');
});

gulp.task('serve:e2e', ['config:test'], function () {
  browserSyncInit(['app', '.tmp'], null, [], false);
});

gulp.task('serve:e2e-dist', ['build:test'], function () {
  browserSyncInit('dist', null, [], false);
});
