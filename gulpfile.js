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

const pixelsToRem = require('postcss-pixels-to-rem');
const uglify = require('gulp-uglify'); //минификации js-файлов

const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

// const jquery      = './node_modules/jquery/dist/jquery.js';


//вспомогательная переменная для создания спрайта в function svgSpriteBuild()
    const   config      = {
                mode: {
                    symbol: {
                        sprite: "../sprite.svg",
                        render: {
                            scss: {
                                dest: '../../../../../sass/config/_sprite.scss'
                            }
                        },
                        example: {
                            dest: '../tmp/spriteSvgDemo.html' // демо html
                        }
                    }
                }
            };

//paths        
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
            self: 'src/styles/',
            src: 'src/styles/app.scss', 
            dest: 'build/assets/styles/'
        },    
        images: {
            src: 'src/images/img/**/*.{png,jpg}', // в src/images/img/ в папках любой вложенности все файлы с расширением *.{png,jpg}
            dest: 'build/assets/images/'
        },
        scripts: {
            src: 'src/scripts/index.js', //
            dest: 'build/assets/scripts/'
        },
        svg: {
            src:'src/images/svg/**/*.svg',
            dest:'src/images/img/icons/sprite/'
        },
        svgSprite: {
            src: 'src/images/img/icons/sprite/sprite.svg',
            dest: 'build/assets/images/icons/sprite'
        },
        fonts: {
          src:'src/fonts/**/*.*',
          dest:'build/assets/fonts/'
        }
    };


// pug
    function templates() {
        return gulp.src(paths.templates.pages) //берём файлы
            .pipe(pug({ pretty: true })) //компилируем, делаем красивые отступы
            .pipe(gulp.dest(paths.root)); //куда положить
            //.on('end', browserSync.reload); // в функции server browserSync.watch
    };

// // scss стили и конвертация px в rem
//     function styles() {

//         var plugins = [ pixelsToRem() ];

//         return gulp.src(paths.styles.src) 

//             .pipe(gP.plumber({
//                 errorHandler: gP.notify.onError(function(error) {
//                 return {
//                     title: 'Styles',
//                     message: error.message
//                 };
//                 })
//             }))

//             .pipe(sourcemaps.init())  //1.sourcemaps инициализация
//             .pipe(sass({includePaths: require('node-normalize-scss').includePaths}))
//             .pipe(sass({outputStyle: 'compressed'})) //2. компиляция в css
//             .pipe(gP.concat('main.css'))             //2a. 'склеивание'
//             .pipe(gP.postcss(plugins))  //2b. .postcss анализирует css и вызывает pixelsToRem()
//             .pipe(gP.autoprefixer({
//                 browsers: ['last 3 versions'],
//                 cascade: false
//               }))
//             .pipe(sourcemaps.write()) //3.sourcemaps запись
//             .pipe(rename({suffix: '.min'})) //переименовали
//             .pipe(gulp.dest(paths.styles.dest)) //куда положить
//             .pipe(browserSync.stream()); 
//     };

// scss
function styles() {
    return gulp.src(paths.styles.src) //исходный файл app.scss
        .pipe(sourcemaps.init())  //1.sourcemaps инициализация
        .pipe(sass({outputStyle: 'compressed', includePaths: require('node-normalize-scss').includePaths})) //2.sourcemaps компиляция
        .pipe(sourcemaps.write()) //3.sourcemaps запись
        .pipe(rename({suffix: '.min'})) //переименовали
        .pipe(gulp.dest(paths.styles.dest)) //куда положить
}



// img переносим и минифицируем картинки
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
            //  .pipe(gP.imagemin({use: [pngquant()]}))
            .pipe(gulp.dest(paths.images.dest))
    };

// svg создание спрайта, демки и перенос в продакшн 
    //создание спрайта и демки
    function svgSpriteBuild() {
        return gulp.src(paths.svg.src)
            // минифицируем svg
            .pipe(gP.svgmin({
                js2svg: {
                    pretty: true
                }
            }))
            //удалит все атрибуты fill, style and stroke в фигурах. Парсит, но как работает?
            .pipe(gP.cheerio({
                run: function($) {
                    $('[fill]').removeAttr('fill');
                    $('[stroke]').removeAttr('stroke');
                    $('[style]').removeAttr('style');
                },
                parserOptions: {
                    xmlMode: true
                }
            }))
            // плагин gulp-replace заменит, если появилась, скобка '&gt;', на нормальную.
            .pipe(gP.replace('&gt;', '>'))
            //paths.svgdest:'src/images/img/icons/sprite/'
            // создание спрайта и демки
            .pipe(gP.svgSprite(config))
            .pipe(gulp.dest(paths.svg.dest));
    }
    //копируем готовый спрайт из src-исходников в build-продакшен
    function  svgSprite() {
        return gulp.src(paths.svgSprite.src)
            .pipe(gulp.dest(paths.svgSprite.dest));
    };

// fonts перекладываем из src в build
    function fonts() {
        return gulp.src(paths.fonts.src)
            .pipe(gP.plumber({
                errorHandler: gP.notify.onError(function(error) {
                return {
                    title: 'Fonts',
                    message: error.message
                };
                })
            }))
            .pipe(gulp.dest(paths.fonts.dest))
    };
    

//scripts webpack
    function scripts() {
        return gulp.src(paths.scripts.src)
            .pipe(gulpWebpack(webpackConfig, webpack)) 
            .pipe(gulp.dest(paths.scripts.dest));
    };    

// очистка, удаляет все скомпилированные файлы, папку build
    function clean() {
        return del(paths.root);
    };

// watch галповский вотчер, (за чем следить, какую фун-ю вызывать)
    function watch() {
        gulp.watch(paths.styles.self+'**/*.scss', styles);
        gulp.watch(paths.templates.src, templates);
        gulp.watch(paths.images.src, images);
        gulp.watch(paths.scripts.src, scripts);
        gulp.watch(paths.svg.src, svgSpriteBuild);
        gulp.watch(paths.fonts.src, fonts);
    };

// локальный сервер + livereload (встроенный)
    function server() {
        browserSync.init({
            server: paths.root
        });
        //следит за папкой build + всеми файлами в ней, перезагружает при изменении
        browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
        // browserSync.watch(paths.root, browserSync.reload);  юра советовал
    }

//для отладки, вызов функций из консоли
    exports.clean = clean;
    exports.templates = templates;
    exports.svgSpriteBuild = svgSpriteBuild;
    exports.svgSprite = svgSprite;
    exports.images = images;
    exports.fonts = fonts;
    exports.styles = styles;
    exports.scripts = scripts;


// default
    gulp.task('default', gulp.series(
        clean,
        svgSpriteBuild,
        gulp.parallel(templates, styles, svgSprite, fonts, images, scripts),
        gulp.parallel(watch, server)
    ));