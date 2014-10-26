var gulp = require('gulp'),
    rsx2rv = require('jsx2rv'),
    concat = require('gulp-concat'),
    srcViewPath = './js/view',
    compiledViewPath = './js/view/.compiled';


gulp.task('jsx2rv', function(cb) {
    gulp.src(srcViewPath + '/**/*.js')
        .pipe(rsx2rv())
        .pipe(gulp.dest(compiledViewPath))
        .pipe(concat('merged.js'))
        .pipe(gulp.dest(compiledViewPath));
    cb();
});

gulp.task('watch', ['jsx2rv'], function(cb) {
    gulp.watch(srcViewPath + '/**/*.js', ['jsx2rv']);
    cb();
});

gulp.task('default', ['jsx2rv']);