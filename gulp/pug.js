const
    {isBuild, onError} = require('./common'),
    plumber = require('gulp-plumber'),
    { pugOptions, beautifyOptions, cleancssOptions, project, path, banner, PUG_SEPARATED_LENGTH } = require('./config.js'),
    beautify = require('gulp-jsbeautifier'),
    pug = require('gulp-pug'),
    globby = require('globby'),
    p = require('path'),
    noop = require("gulp-noop")
;

module.exports = (gulp) => {
    const compilePug = (gulpSrc, destFn) => {
        return gulpSrc.pipe(plumber({ errorHandler: onError }))
            .pipe(!isBuild ? pug(pugOptions.development) : pug(pugOptions.build))
            .pipe(beautify(beautifyOptions.html))
            // 파일 확장자 이름 변경할 때 사용(파일 이름도 변경 가능)
            // .pipe(mode.build(rename(function (path) {
            //     path.extname = ".php";
            // })))
            // 페이지 상단에 특정 소스를 삽입 사용(삽입 내용은 config.js)
            // .pipe(mode.build(header(banner)))
            .pipe(destFn ? gulp.dest(destFn) : !isBuild ? gulp.dest(path.dest) : gulp.dest(path.build));
    }
    gulp.task('pug_page', () => {
        return compilePug(gulp.src(path.pug.src.pug_page, { since: gulp.lastRun('pug_page') }))
    })

    gulp.task('pug_codinglist', () => {
        return compilePug(gulp.src(path.pug.src.pug_codinglist))
    });

    const taskNames = [];
    const pugList = [];
    const paths = globby.sync(path.pug.src.pug_page);

    paths.forEach((path, index) => {
        const count = index % PUG_SEPARATED_LENGTH;

        if(!pugList[count]){
            pugList.push([]);
        }

        pugList[count].push(path);
    })

    pugList.forEach((paths, index) => {
        const taskName = `pug_page_all${index}`;
        taskNames.push(taskName);

        gulp.task(taskName, () => {
            return compilePug(gulp.src(paths), function destFn(file){
                return p.dirname(file.path).replace(`${p.sep}${project.default.src}`, `${p.sep}${!isBuild ? path.dest : path.build}`)
            })
        });
    })

    return taskNames;
}
