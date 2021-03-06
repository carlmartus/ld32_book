var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jsInline = require('gulp-js-inline');

gulp.task('js', ['glsl'], function() {
	return gulp.src(['js/*.js', 'gen/*.js'])
		.pipe(concat('book.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('www'));
});

gulp.task('ext', function() {
	return gulp.src('ext/*.js')
		.pipe(concat('bundle.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('www'));
});

gulp.task('glsl', function() {
	return gulp.src('glsl/*.c')
		.pipe(jsInline({ 'name': 'glslStore' }))
		.pipe(concat('glsl.js'))
		.pipe(gulp.dest('gen'));
});

gulp.task('watch', ['default'], function() {
	gulp.watch('js/*.js', ['js']);
	gulp.watch('gen/*.js', ['js']);
	gulp.watch('glsl/*.c', ['glsl']);
	gulp.watch('ext/*', ['ext']);
});

gulp.task('default', ['js', 'ext', 'glsl']);

