var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var util = require('gulp-util');
var gulpif = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var htmlmin = require('gulp-htmlmin');

var config = {
    sourceMaps: !util.env.production
}

gulp.task('default', ['build', 'sass', 'js', 'header-js', 'imagemin', 'fonts', 'watch']);

gulp.task('sass', function(){
    return gulp.src('./src/scss/main.scss')
    .pipe(gulpif(config.sourceMaps, sourcemaps.init()))
        .pipe(sass({
            outputStyle: 'expanded',
            includePaths: ['./src/scss'] //add your other css dependencies here
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 5 versions'))
       // .pipe(cssnano())
        .pipe(gulpif(config.sourceMaps, sourcemaps.write('./maps')))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('js', function(){
    return gulp.src([
        './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
        './node_modules/jquery-match-height/dist/jquery.matchHeight.js',
        './node_modules/jquery-parallax.js/parallax.js',
        './node_modules/bootstrap-sass-datepicker/js/bootstrap-sass-datepicker.js',
        './bower_components/jquery.countdown/dist/jquery.countdown.js',
        './node_modules/@fortawesome/fontawesome/index.js',
        './src/js/scripts.js'
    ]) //add your other js dependencies here
    .pipe(gulpif(config.sourceMaps, sourcemaps.init()))
    .pipe(concat('main.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulpif(config.sourceMaps, sourcemaps.write('./maps')))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('header-js', function() {
    return gulp.src([
        './node_modules/scrollreveal/dist/scrollreveal.js',
        './node_modules/jquery/dist/jquery.js',
    ])
    .pipe(gulpif(config.sourceMaps, sourcemaps.init()))
    .pipe(concat('header.js'))
    .pipe(uglify({mangle: false}))
    .pipe(gulpif(config.sourceMaps, sourcemaps.write('./maps')))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('build', function(){
    return gulp.src(['./src/pages/*.hbs'])
    .pipe(handlebars({}, {
        ignorePartials: true,
        batch: ['./src/partials']
    }))
    .pipe(rename({
        extname: '.html'
    }))
    // .pipe(htmlmin({
    //     collapseWhitespace: true,
    //     decodeEntities:true,
    //     minifyCSS:true
    // }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('fonts', function() {
    return gulp.src([
        'node_modules/@fortawesome/fontawesome/fontawesome-common-types/*',
    ])
    .pipe(gulp.dest('./dist/webfonts/'));
});

gulp.task('imagemin', function(){
    return gulp.src(['./src/images/**/*'])
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('watch', function() {
    gulp.watch('src/images/**/*',['imagemin']);
    gulp.watch('src/scss/**/*.scss',['sass']);
    gulp.watch('src/js/**/*',['js']);
    gulp.watch('src/js/**/*',['header-js']);    
    gulp.watch('src/**/*.hbs',['build']);  
});