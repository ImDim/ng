'use strict';

module.exports = function() {
  $.gulp.task('js:process', function() {
    return $.gulp.src($.path.app)
      //.pipe($.gp.sourcemaps.init())
      .pipe($.gp.concat('app.js'))
      //.pipe($.gp.sourcemaps.write())
      .pipe( $.gp.minifier({

          minify: $.config.minify,
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyJS: true,
          minifyCSS: true,
          getKeptComment: function (content, filePath) {
              var m = content.match(/\/\*![\s\S]*?\*\//img);
              return m && m.join('\n') + '\n' || '';
          }

      }))
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};
