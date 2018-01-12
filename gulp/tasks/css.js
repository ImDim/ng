'use strict';

module.exports = function() {
    $.gulp.task('css', function() {
        return $.gulp.src('./source/style/**/**/*.css')
        //.pipe($.gp.sourcemaps.init())
            //.pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
            //.pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
            //.pipe($.gp.cssUnit({type : 'px-to-rem',fontSize : 16}))
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
            //.pipe($.gp.sourcemaps.write())
            .pipe($.gulp.dest($.config.root + '/assets/css'))
            .pipe($.browserSync.stream());
    })
};
