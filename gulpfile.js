var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function() {
    gulp.src('public/**/*', {read: false})
        .pipe(clean());
});

gulp.task('html', function() {
 return gulp.src('app/**/*.html')
    .pipe(gulp.dest('public'));
});

gulp.task('components', function() {
 return gulp.src('bower_components/**/*')
    .pipe(gulp.dest('public/bower_components'));
});

gulp.task('css', function() {
 return gulp.src('app/styles/**/*')
    .pipe(gulp.dest('public/styles'));
});

gulp.task('default', ['html', 'components', 'css']);
