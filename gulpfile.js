/**
 * Tasks:
 *     gulp             (default prod task)
 *     gulp css         (dev css task)
 *     gulp js          (dev js task)
 *     gulp watch       (watcher task)
 *     gulp devwatch    (dev watcher task)
 */

// requirements
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var size        = require('gulp-size');
var changed     = require('gulp-changed');
var sass        = require('gulp-sass');
var minifyCSS   = require('gulp-minify-css');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var prefix      = require('gulp-autoprefixer');
var scsslint    = require('gulp-scss-lint');
var browserify  = require('browserify');
var jshint      = require('gulp-jshint');
var stream      = require('vinyl-source-stream');
var streamify   = require('gulp-streamify');

// source paths
var base = 'themes/default/'; // theme root

var build = { // build folders (where will the development happen?)
	scss: base + 'scss/',
	js: base + 'js/' 
}

var dist = { // distribution folders (where should the output live?)
	css: base + 'dist/css/',
	js: base + 'dist/js/' 
}

// build paths
var paths = {
	css: {
		src: [
			build.scss + '*.scss'
		],
		dest: dist.css,
		watch: [
			build.scss + '*.scss',
			build.scss + '**/*.scss'
		]
	},
	scripts: {
		main: './' + build.js + 'app.js',
		utilities: build.js + 'utils/*.js',
        dest: dist.js,
		watch: [
			build.js + 'app.js',
			build.js + 'utils/*.js'
		]
	}
}

// CSS lint task
gulp.task('css:lint', function() {

	var src = build.scss + '*.scss';

	// lint the files first
	return gulp.src(src)
    	.pipe(scsslint())
    	.pipe(scsslint.failReporter());

});

// dev css processing (unminified)
gulp.task('css', ['css:lint'], function() {

	var src = paths.css.src;
	var dest = paths.css.dest;

	// compile the css
    return gulp.src(src)
    	.pipe(changed(dest))
        .pipe(sass({
        	sourceComments: 'map',
        	includePaths: [
        		build.css
        	]
        }))
        .pipe(prefix("last 1 version", "> 1%", "ie 8"))
        .pipe(size({
        	title: 'css'
        }))
        .pipe(gulp.dest(dest))
        .on('error', gutil.log);

});

// production css processing (minified)
gulp.task('css:prod', ['css'], function() {

    var src = paths.css.dest + '*.css';
    var dest = paths.css.dest;

    // compile the css
    return gulp.src(src)
        .pipe(minifyCSS())
        .pipe(size({
            title: 'min.css'
        }))
        .pipe(gulp.dest(dest))
        .on('error', gutil.log);
});

// dev js processing (unminified)
gulp.task('js', function() {

    var src = paths.scripts.main;
    var dest = paths.scripts.dest;

    // compile full js
    return browserify(src)
        .bundle()
        .pipe(stream('core.js'))
        .pipe(streamify(size({
            title: 'js'
        })))
        .pipe(gulp.dest(dest))
        .on('error', gutil.log);

});

// production js processing (minified)
gulp.task('js:prod', ['js'], function() {

    var src = paths.scripts.main;
    var dest = paths.scripts.dest;

    // uglify the js
    return browserify(src)
        .transform({global: true}, 'uglifyify')
        .bundle()
        .pipe(stream('core.js'))
        .pipe(streamify(size({
            title: 'min.js'
        })))
        .pipe(gulp.dest(dest))
        .on('error', gutil.log);

});

gulp.task('watch', ['css:prod', 'js:prod'], function() {
	gulp.watch(paths.css.watch, ['css:prod']);
    gulp.watch(paths.scripts.watch, ['js:prod']);
});

gulp.task('default', [
	'css:prod',
    'js:prod'
]);
