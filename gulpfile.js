var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jsInline = require('gulp-js-inline');

gulp.task('glsl', function() {
	return gulp.src('glsl/*.c')
		.pipe(jsInline({ 'name': 'glslStore' }))
		.pipe(concat('glsl.js'))
		.pipe(gulp.dest('gen'));
});

gulp.task('ext', function() {
	return gulp.src('ext/*.js')
		 .pipe(concat('bundle.min.js'))
		 .pipe(uglify())
		 .pipe(gulp.dest('www'));
});

