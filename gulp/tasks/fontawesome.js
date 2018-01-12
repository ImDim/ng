'use strict';

module.exports = function() {
    $.gulp.task('icons', function() {
        return $.gulp.src('./bower_components/components-font-awesome/fonts/**.*')
            .pipe($.gulp.dest($.config.root + '/assets/fonts'))
    })
};