var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var args = require('yargs').argv;

// gulp --prod 
var confSrc = args.prod ? 'app/conf/prod.js' : 'app/conf/dev.js';

gulp.task('clean', function() {
    gulp.src('public/**/*', {read: false})
        .pipe(clean());
});

gulp.task('js', function() {
  gulp.src(['app/scripts/**/*.js', confSrc])
    .pipe(uglify({outSourceMap: true}))
    .pipe(concat("app.min.js"))
    .pipe(gulp.dest('public'))
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

gulp.task('default', ['js', 'html', 'components', 'css']);
