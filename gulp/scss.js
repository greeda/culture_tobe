const
    {isBuild, onError, mode} = require('./common'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    { pugOptions, beautifyOptions, cleancssOptions, project, path, banner, SCSS_SEPARATED_LENGTH } = require('./config.js'),
    globby = require('globby'),
    p = require('path'),
    noop = require("gulp-noop")
;

module.exports = (gulp) => {
    const compileScss = (gulpSrc, destFn) => {
        return gulpSrc.pipe(plumber({ errorHandler: onError }))
            .pipe(mode.development(sourcemaps.init()))
            .pipe(sass({}))
            .pipe(autoprefixer())
            .pipe(!isBuild ? noop() : cleanCSS(cleancssOptions.normal))
            // css 가독성을 더 높이기 위해서는 아래 소스를 주석해제
            // .pipe(beautify(beautifyOptions.css))
            .pipe(mode.development(sourcemaps.write('../sass_maps')))
            .pipe(destFn ? gulp.dest(destFn) : !isBuild ? gulp.dest(path.dest) : gulp.dest(path.build));
    }

    gulp.task('sass_category', () => {
        return compileScss(gulp.src(path.sass.src.sass_category, { since: gulp.lastRun('sass_category') }))

    });

    const taskNames = [];
    const scssList = [];
    const paths = globby.sync(path.sass.src.sass_category);

    paths.forEach((path, index) => {
        const count = index % SCSS_SEPARATED_LENGTH;

        if(!scssList[count]){
            scssList.push([]);
        }

        scssList[count].push(path);
    })

    scssList.forEach((paths, index) => {
        const taskName = `scss_src_all${index}`;
        taskNames.push(taskName);

        gulp.task(taskName, () => {
            return compileScss(gulp.src(paths), function destFn(file){
                return p.dirname(file.path).replace(`${p.sep}${project.default.src}`, `${p.sep}${!isBuild ? path.dest : path.build}`)
            })
        });
    })

    return taskNames;
}
