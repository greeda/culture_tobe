const
    {isBuild, onError, mode} = require('./common'),
    { pugOptions, beautifyOptions, cleancssOptions, path, banner } = require('./config.js'),
    imagemin = require('gulp-imagemin')
;

module.exports = (gulp) => {
    gulp.task('images', () => {
        return gulp.src(path.images.src)
            // 20210615 이미지 압축 소스 삭제 (build 속도가 많이 느려짐)
            // .pipe(mode.build(imagemin([
            //     imagemin.gifsicle({interlaced: true}),
            //     // jpg는 포토샵에서 압축률 조정하고 포토샵에서 progressive 옵션이 필요한 이미지만 설정하기
            //     // imagemin.mozjpeg({quality: 100, progressive: true}),
            //     imagemin.optipng({optimizationLevel: 5}),
            //     imagemin.svgo({
            //         plugins: [
            //             {removeViewBox: true},
            //             {cleanupIDs: false}
            //         ]
            //     })
            // ],{
            //     verbose: true
            // })))
            .pipe(!isBuild ? gulp.dest(path.dest) : gulp.dest(path.build));
    })

}
