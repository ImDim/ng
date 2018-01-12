'use strict';

global.$ = {
    package: require('./package.json'),
    config: require('./gulp/config'),
    path: {
        task: require('./gulp/paths/tasks.js'),
        app: require('./gulp/paths/app.js')
    },
    gulp: require('gulp'),
    del: require('del'),
    browserSync: require('browser-sync').create(),
    gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function(taskPath) {
    require(taskPath)();
});

$.gulp.task('start', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'sass',
        'css',
        'pug',
        'js:process',
        'copy:image',
        'copy:js',
        'copy:fonts',
        'icons'
        //'sprite'
    ),
    $.gulp.parallel(
        'watch',
        'serve'
    )
));
