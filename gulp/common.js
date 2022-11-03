const notify = require('gulp-notify');

const mode = exports.mode = require('gulp-mode')({ modes: ['development', 'build'] })

// mode.build() 는 npm run build 에서만 실행됨

// .pipe(!isBuild ? gulp.dest(path.pug.dest) : gulp.dest(path.pug.build)); 는
// npm run gulp 에서는 www 폴더로
// npm run build 에서는 build 폴더로

const isDevelopment = exports.isDevelopment = mode.development();
const isBuild = exports.isBuild = mode.build();

const onError = exports.onError = function (err) {
        notify.onError({
            title: "Gulp",
            subtitle: "Failure!",
            message: "Error: <%= error.message %>",
            sound: "Beep"
        })(err);

        this.emit('end');
    };