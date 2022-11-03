const
    {isBuild, onError, mode} = require('./common'),
    {pugOptions, beautifyOptions, cleancssOptions, path, banner} = require('./config.js'),
    imagemin = require('gulp-imagemin'),
    gutil = require('gulp-util'),
    ftp = require('gulp-ftp'),
    zip = require('gulp-zip'),
    del = require('del'),
    browserSync = require('browser-sync').create()
;

module.exports = (gulp) => {
    gulp.task('etc', () => {
        return gulp.src(path.etc.src)
            .pipe(!isBuild ? gulp.dest(path.dest) : gulp.dest(path.build));
    })

    gulp.task('browser_sync', (done) => {
        browserSync.init(path.browserSyncOption);
        done();
    })

    gulp.task('deploy', () => {
        return gulp.src(path.ftpPath.ignore)
            .pipe(ftp(path.ftpOptions))
            .pipe(gutil.noop());
    })

    gulp.task('bak', () => {
        return gulp.src(path.backup)
            .pipe(zip('bak_' + (() => {
                var date = new Date();
                return date.toISOString().substring(0, 10) // YYYY-MM-DD
                    + '_'
                    + ('0' + date.getHours()).slice(-2)
                    + ('0' + date.getMinutes()).slice(-2)
                    + ('0' + date.getSeconds()).slice(-2)
            })() + '.zip'))
            .pipe(gulp.dest('__etribe_ux/backup'));
    })

    gulp.task('clean', (done) => {
        del.sync([path.clean.build]);
        done();
    })

    gulp.task('clean_build', (done) => {
        del.sync(path.clean.build_unnecessary);
        done();
    })
}
