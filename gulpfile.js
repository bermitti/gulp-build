'use strict'
//plugins
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps'); //для дебажа
const del = require('del');
const browserSync = require('browser-sync').create();
const pngquant = require('imagemin-pngquant'); //сжатиe изображений

//gulp-load-plugins избавляет от необходимости явно подключать плагин в gulpfile.js, но не от необходимости устанавливать npm-модуль
const gP = require('gulp-load-plugins')(); //автоматическоe подключениe плагинов


// const pixelsToRem = require('postcss-pixels-to-rem');
// const uglify = require('gulp-uglify'); //минификации js-файлов
// const jquery      = './node_modules/jquery/dist/jquery.js';
// const normalize   = './node_modules/normalize.scss/normalize.scss';

//разобраться
//const gulpWebpack = require('gulp-webpack');
//const webpack = require('webpack');
//const webpackConfig = require('./webpack.config.js');

const paths = {
    //сразу указываем папку продакшена, корень проекта build
    root: './build',
    templates: {
        //-где лежат pages взять все файлы c расширением pug
        pages: 'src/templates/pages/*.pug',
        //-в templates все pug-файлы любой вложенности
        src: 'src/templates/**/*.pug',
    },
    styles: {
        src: 'src/styles/**/*.scss',
        dest: 'build/assets/styles/'
    },    
    images: {
        src: 'src/images/**/*.*',
        dest: 'build/assets/images/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'build/assets/scripts/'
    }
};


// pug
function templates() {
    return gulp.src(paths.templates.pages) //берём файлы
        .pipe(pug({ pretty: true })) //компилируем, делаем красивые отступы
        .pipe(gulp.dest(paths.root)); //куда положить
        //.on('end', browserSync.reload); // в функции server browserSync.watch
};

// scss
function styles() {
    return gulp.src('./src/styles/app.scss') //исходный файл app.scss
        .pipe(sourcemaps.init())  //1.sourcemaps инициализация
        .pipe(sass({outputStyle: 'compressed'})) //2.sourcemaps компиляция
        .pipe(sourcemaps.write()) //3.sourcemaps запись
        .pipe(rename({suffix: '.min'})) //переименовали
        .pipe(gulp.dest(paths.styles.dest)) //куда положить
}

// img переносим b минифицируем картинки
function images() {
    return gulp.src(paths.images.src)
      //.plumber формирует вывод об ошибке
      .pipe(gP.plumber({
        errorHandler: gP.notify.onError(function(error) {
          return {
            title: 'Images',
            message: error.message
          };
        })
      }))
      .pipe(gP.imagemin({use: [pngquant()]}))
      .pipe(gulp.dest(paths.images.dest))
  };

// очистка, удаляет все скомпилированные файлы, папку build
function clean() {
    return del(paths.root);
}

// watch галповский вотчер, (за чем следить, какую фун-ю вызывать)
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
//    gulp.watch(paths.images.src, images);
//    gulp.watch(paths.scripts.src, scripts);
//    gulp.watch(paths.svg.src, svgSpriteBuild);
//    gulp.watch(paths.fonts.src, fonts);
}

// локальный сервер + livereload (встроенный)
function server() {
    browserSync.init({
        server: paths.root
    });
    //следит за папкой build + всеми файлами в ней, перезагружает при изменении
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

//для вызова функций пишем
exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.images = images;

// default
gulp.task('default', gulp.series(
    clean,
//    svgSpriteBuild,
    gulp.parallel(templates, styles, images),
//    gulp.parallel(fonts, templates, styles, scripts, images, svgSprite),
    gulp.parallel(watch, server)
  ));