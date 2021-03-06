var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var filter = require("gulp-filter");
var footer = require("gulp-footer");
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');
var livereload = require('gulp-livereload');

var args = require('yargs').argv;

// gulp --prod 
var isDev = !args.prod;
var confSrc = isDev ? 'app/conf/dev.js' : 'app/conf/prod.js';

gulp.task('clean', function() {
    return gulp.src('public/**/*', {read: false})
        .pipe(clean());
});

gulp.task('map', function() {
  gulp.src(['app/scripts/**/*.js', confSrc])
    .pipe(concat("app.js"))
    .pipe(gulp.dest('public'))
    .pipe(uglify({outSourceMap: 'app.min.js'}))
    .pipe(filter('**/*.map'))
    .pipe(rename('app.min.js.map'))
    .pipe(gulp.dest('public'))
});

gulp.task('js', function() {
  gulp.src(['app/scripts/**/*.js', confSrc])
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(gulpif(isDev, footer("\n//# sourceMappingURL=app.min.js.map")))
    .pipe(gulp.dest('public'))
});

gulp.task('json', function() {
 return gulp.src('json/**/*')
    .pipe(gulp.dest('public/json'));
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


var tasks = ['js', 'html', 'components', 'css'];
if (isDev) {
	tasks.push('json');
	tasks.push('map');
}

gulp.task('server', tasks, function() {
	require('./app');
});

gulp.task('build', tasks);

gulp.task('rebuild', function(callback) {
  runSequence('clean', tasks, callback);
});

gulp.task('all', function(callback) {
  runSequence('clean', 'default', callback);
});

gulp.task('default', ['server'], function(){
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('bower_components/**/*', ['components']);

  gulp.watch('app/styles/**/*', ['css']);
  
  gulp.watch('app/scripts/**/*.js', ['js']);

  if(isDev) {
    gulp.watch('app/scripts/**/*.js', ['map']);
    gulp.watch('json/**/*', ['json']);
  }

  var lserv = livereload();
  gulp.watch('public/**').on('change', function(file) {
  	console.log('changed file: ' + file.path);
    lserv.changed(file.path);
  });

});
