const
    {isBuild, onError} = require('./common'),
    { pugOptions, beautifyOptions, cleancssOptions, path, banner } = require('./config.js')
;

module.exports = (gulp) => {
    gulp.task('js', () => {
        return gulp.src(path.js.src)
            .pipe(!isBuild ? gulp.dest(path.dest) : gulp.dest(path.build));
    })
}

