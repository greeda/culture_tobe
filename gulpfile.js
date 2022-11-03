"use strict";

const
    gulp = require('gulp'),

    { path } = require('./gulp/config.js'),

    gulpMultiProcess = require('gulp-multi-process'),
    argv = require('yargs').argv,
    browserSync = require('browser-sync').create(),

    pugInit = require('./gulp/pug'),
    scssInit = require('./gulp/scss'),
    jsInit = require('./gulp/js'),
    imagesInit = require('./gulp/images'),
    spriteInit = require('./gulp/sprite'),
    etcInit = require('./gulp/etc')
;

// **********************************
// 프로젝트 task 세팅 - 2021. 02. 13.
// **********************************

const pugTaskNames = pugInit(gulp);
const scssTaskNames = scssInit(gulp);
jsInit(gulp);
imagesInit(gulp);
spriteInit(gulp);
etcInit(gulp);

const watcher = (done) => {
    /**
     * check reloadable argument.
     * $ gulp --reloadable = npm run auto
     */
    let isReload = argv.reloadable,
    reloadFunc = isReload ? browserSync.reload : function () {};

    // pug watch 2021. 02. 13.
    gulp.watch(path.pug.watch.pug_page, gulp.parallel('pug_page')).on('change', reloadFunc);
    gulp.watch(path.pug.watch.pug_codinglist, gulp.parallel('pug_codinglist')).on('change', reloadFunc);
    gulp.watch(path.pug.watch.pug_src, gulp.series(
        ...pugTaskNames
    )).on('change', reloadFunc);

    // sass watch 2021. 02. 13.
    gulp.watch(path.sass.watch.sass_category, gulp.parallel('sass_category')).on('change', reloadFunc);
    gulp.watch(path.sass.watch.sass_src, gulp.series(
        ...scssTaskNames
    )).on('change', reloadFunc);

    // sprite sass watch
    gulp.watch(path.sprite.src.sprite_mobile, gulp.parallel('sprite_mobile')).on('change', reloadFunc);
    gulp.watch(path.sprite.src.sprite_pc, gulp.parallel('sprite_pc')).on('change', reloadFunc);

    // etc watch
    gulp.watch(path.images.watch, gulp.parallel('images')).on('change', reloadFunc);
    gulp.watch(path.js.watch, gulp.parallel('js')).on('change', reloadFunc);
    gulp.watch(path.etc.watch, gulp.parallel('etc')).on('change', reloadFunc);

    done();
};



function multi(done) {
    // task1 and task2 will run in different processes
    return gulpMultiProcess([
        ...pugTaskNames,
        ...scssTaskNames
    ], done);
}

/**
 * build Function
 */
const build = gulp.series(
    'clean',
    'sprite_mobile',
    'sprite_pc',
    'images',
    'js',
    'etc',
    'pug_codinglist',
    multi,
    'clean_build'
);

/**
 * development Function
 */
const dev = gulp.series(
    'sprite_mobile',
    'sprite_pc',
    'images',
    // sass_category,
    ...scssTaskNames,
    'js',
    'etc',
    // pug_page,
    'pug_codinglist',
    ...pugTaskNames,
    watcher,
    'browser_sync'
);

exports.watcher = watcher;
exports.multi = multi;
exports.build = build;
exports.dev = dev;
exports.default = dev;
