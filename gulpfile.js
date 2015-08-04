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
var sass        = require('gulp-sass');
var minifyCSS   = require('gulp-minify-css');
var prefix      = require('gulp-autoprefixer');
var browserify  = require('browserify');
var stream      = require('vinyl-source-stream');
var iconify     = require('gulp-iconify');
var replace     = require('gulp-replace');
var rename      = require("gulp-rename");

// source paths
var base = 'themes/default/'; // theme root

var build = { // build folders (where will the development happen?)
	scss: base + 'scss/',
	js: base + 'js/',
    icon: base + 'icons/'
}

var dist = { // distribution folders (where should the output live?)
	css: base + 'dist/css/',
	js: base + 'dist/js/',
    icon: base + 'dist/icons/'
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
	},
    icons: {
        src: './' + build.icon + '*.svg',
        output: './' + dist.icon,
        pngOutput: './' + dist.icon + '/png/'
    }
}

// dev css processing (unminified)
gulp.task('css', function() {

	var src = paths.css.src;
	var dest = paths.css.dest;

	// compile the css
    return gulp.src(src)
        .pipe(sass({
        	sourceComments: 'map',
        	includePaths: [
        		build.scss
        	]
        }))
        .pipe(prefix("last 1 version", "> 1%", "ie 8"))
        .pipe(gulp.dest(dest));

});

// production css processing (minified)
gulp.task('css:prod', ['css'], function() {

    var src = paths.css.dest + '*.css';
    var dest = paths.css.dest;

    // compile the css
    return gulp.src(src)
        .pipe(minifyCSS())
        .pipe(gulp.dest(dest));
});

// dev js processing (unminified)
gulp.task('js', function() {

    var src = paths.scripts.main;
    var dest = paths.scripts.dest;

    // compile full js
    return browserify(src)
        .bundle()
        .pipe(stream('core.js'))
        .pipe(gulp.dest(dest));

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
        .pipe(gulp.dest(dest));

});

gulp.task('icon', function() {
    iconify({
        src: paths.icons.src,
        pngOutput: paths.icons.pngOutput,
        // scssOutput: build.scss,
        cssOutput: paths.icons.output,
        scssDisabled: true
    });
});

gulp.task('colorise_test', function() {
    var colors = ['#666666', '#888888', 'red', 'green'];

    for (var i = colors.length - 1; i >= 0; i--) {
        var color = colors[i];
        gulp.src(paths.icons.src)
            .pipe(replace(/(.*?fill=")([^"]*?)(".*?)/g, '$1' + color + '$3'))
            .pipe(rename({ suffix: "-" + color }))
            .pipe(gulp.dest('./' + base + 'temp/'));
    };

});

gulp.task('watch', ['css:prod', 'js:prod'], function() {
	gulp.watch(paths.css.watch, ['css:prod']);
    gulp.watch(paths.scripts.watch, ['js:prod']);
});

gulp.task('default', [
	'css:prod',
    'js:prod'
]);
