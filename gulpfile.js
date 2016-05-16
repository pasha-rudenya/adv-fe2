var destDir = 'bin';
var gulp = require('gulp');
var bower = require('gulp-bower');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var less = require('gulp-less');
var argv = require('yargs').argv;
var debug = require( 'gulp-debug' );
var clean = require( 'gulp-clean' );
var livereload = require('gulp-livereload');
var csscomb = require('gulp-csscomb');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var minifyCss = require('gulp-minify-css');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var htmlhint = require('gulp-htmlhint');
var htmlmin = require('gulp-htmlmin');
var autoprefixer = require('gulp-autoprefixer');
var gitmodified = require('gulp-gitmodified');

//gulp.task('default', ['libs', 'build']);
gulp.task('default', ['html', 'css', 'js', 'images']);

gulp.task('build', ['copy-static', 'css']);

gulp.task('libs', function () {
    return gulp.src(['libs/**/*.min.js'])
        .pipe(gulp.dest(destDir + '/libs'));
});

gulp.task('images', function () {
    return gulp.src(['**/*.{png,jpg,svg}','!node_modules/**','!libs/**'])
        .pipe(gulp.dest(destDir));
});

gulp.task('html', function () {
    return gulp.src(['**/*.html','!node_modules/**','!libs/**'])
        .pipe(gulpif(argv.prod, htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest(destDir));
});

gulp.task('copy-static', function () {
    return gulp.src(['images/**/*.{png,jpg,svg}', '*.html', '**.*.js'])
        .pipe( gulp.dest(destDir) );
});

gulp.task('bower', function () {
    return bower('libs');
});

gulp.task('css', function () {
    return gulp.src('styles/**/*.less')
        .pipe(gulpif(argv.prod, sourcemaps.init()))
        .pipe(concat('styles.css'))
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulpif(argv.prod, sourcemaps.write()))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(destDir + '/static'));
});

gulp.task('js', function() {
    return gulp.src('js/**/*.js')
        .pipe(gulpif(argv.prod, sourcemaps.init()))
        .pipe(concat('file.js'))
        .pipe(uglify())
        .pipe(gulpif(argv.prod, sourcemaps.write()))
        .pipe(gulp.dest(destDir));
});

gulp.task( 'reload-page', function () {
} );

gulp.task( 'clean', function (cb) {
    return gulp.src( destDir + '/*', { read: false } )
        .pipe( clean( { force: true } ) );
} );


gulp.task( 'watch', function () {
    livereload.listen();

    gulp.watch('**/*.html', [ 'html' ] );
    gulp.watch('**/*.less', [ 'css' ] );
    gulp.watch('**/*.js', [ 'js' ] );
    gulp.watch('**/*.@(png|jpg|svg)', [ 'images' ] );
} );


//CODESTYLE
gulp.task('csscomb', function () {
    return gulp.src('styles/*.less')
        .pipe(csscomb().on('error', handleError))
        .pipe(gulpif(isAll, (gulp.dest(function (file) {
            return file.base;
        })),
        gulp.dest(function () {
            var files = getModifiedFiles();
            files.on('data', function (file) {
                return file.base;
            });
        })));
});

gulp.task('htmlhint', function () {
    return gulp.src(['**/*.html','!node_modules/**'])
        .pipe(htmlhint())
        .pipe(htmlhint.failReporter());
});

gulp.task('jscs', function () {
    return gulp.src(['js/**/*.js'])
        .pipe(jscs())
        .pipe(jscs.reporter());
});

gulp.task('jshint', function () {
    return gulp.src(['js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('style', function () {
    runSequence('jshint', 'jscs', 'htmlhint', 'csscomb');
});

//CODESTYLE//

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
    return this;
}

function isAll() {
    if (argv.all === true) {
        return true;
    }
}

function getModifiedFiles() {
    return gulp.src('styles/*.less')
            .pipe(gitmodified('modified'));
}