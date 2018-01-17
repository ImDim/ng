'use strict';

module.exports = function() {

    $.gulp.task('static', function() {

        return $.gulp.src('./source/static/**/*.*')

        .pipe($.gulp.dest($.config.root + '/assets/'))
        .pipe($.browserSync.stream());

    });

}