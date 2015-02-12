var gulp = require('gulp');
var uncss = require('gulp-uncss');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var path = require('path');
var watch = require('gulp-watch');
var please = require('gulp-pleeease');

var LessPluginCleanCSS = require("less-plugin-clean-css"), 
		cleancss = new LessPluginCleanCSS({advanced: true});

gulp.task('scripts', function() {
  gulp.src(['./js/custom.js', 
		'./js/another.js'])
    .pipe(concat('all.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'))
});

gulp.task('css', function () {
  gulp.src('./css/custom.less')
    .pipe(less({
	    plugins: [cleancss]
	  }))
    .pipe(concatCss("all.css"))
    .pipe(please())
    .pipe(rename({suffix: '.min'}))
    .pipe(uncss({
      html: ['http://www.mysite.com','http://www.mysite.com/page1.html']
    }))
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function() {
	gulp.watch('./web/assets/js/custom.js', ['scripts']);
  gulp.watch('./web/assets/css/custom.less', ['css']);
});

gulp.task('default', ['scripts', 'css', 'watch']);



