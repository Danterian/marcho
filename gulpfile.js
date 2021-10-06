const {
    src,
    dest,
    watch,
    parallel,
    series
} = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-image');
const del = require('del');



function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({
            outputStyle: 'compressed'
        }).on('error', scss.logError))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
}

function scripts() {
    return src([
            'node_modules/jquery/dist/jquery.js',
            'app/js/main.js'
        ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
}

function images() {
    return src('app/images/**/*.*')
        .pipe(imagemin())
        .pipe(dest('dist/images'))
}

function build() {
    return src([
            'app/**/*.html',
            'app/css/style.min.css',
            'app/js/main.min.js'
        ], {base:'app'})
        .pipe(dest('dist'))
}

function cleanDist() {
    return del('dist')
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', 'app/js/main.min.js'], scripts);
}

exports.styles = styles;
exports.scripts = scripts;

exports.watching = watching;

exports.images = images;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, images, build);

exports.default = parallel(styles, scripts, watching);

