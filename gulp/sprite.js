const
    {isBuild, onError, mode} = require('./common'),
    { pugOptions, beautifyOptions, cleancssOptions, path, banner } = require('./config.js'),
    spritesmith = require('gulp.spritesmith'),
    merge = require('merge-stream'),
    buffer = require('vinyl-buffer'),
    imagemin = require('gulp-imagemin')
;

module.exports = (gulp) => {
    gulp.task('sprite_mobile', () => {
        /**
         * generate our spritesheet
         */
        let spriteData = gulp.src(path.sprite.src.sprite_mobile)
            .pipe(spritesmith({
                imgPath: path.sprite.mobile.imgPath,
                imgName: path.sprite.mobile.imgName,
                cssName: path.sprite.mobile.cssName,
                retinaSrcFilter: path.sprite.mobile.retinaSrcFilter,
                retinaImgPath: path.sprite.mobile.retinaImgPath,
                retinaImgName: path.sprite.mobile.retinaImgName,
                algorithm: 'binary-tree', //top-down, left-right, diagonal, alt-diagonal, binary-tree
                padding: 10,
                cssVarMap: function (sprite) {
                    sprite.name = 'mobile_' + sprite.name;
                }
            }));
        /**
         * return a merged stream to handle both `end` events
         */
        return merge(
            /**
             * pipe image stream through image optimizer and onto disk
             */
            spriteData.img
                .pipe(buffer())
                .pipe(imagemin())
                .pipe(gulp.dest(path.sprite.dest.sprite_img_mobile)),
            /**
             * pipe CSS stream through CSS optimizer and onto disk
             */
            spriteData.css
                .pipe(gulp.dest(path.sprite.dest.sprite_css_mobile))
        );
    });

    gulp.task('sprite_pc', () => {
        /**
         * generate our spritesheet
         */
        let spriteData = gulp.src(path.sprite.src.sprite_pc)
            .pipe(spritesmith({
                imgPath:path.sprite.pc.imgPath,
                imgName:path.sprite.pc.imgName,
                cssName:path.sprite.pc.cssName,
                algorithm: 'binary-tree', //top-down, left-right, diagonal, alt-diagonal, binary-tree
                padding: 10,
                cssVarMap: function (sprite) {
                    sprite.name = 'pc_' + sprite.name;
                }
            }));
        /**
         * return a merged stream to handle both `end` events
         */
        return merge(
            /**
             * pipe image stream through image optimizer and onto disk
             */
            spriteData.img
                .pipe(buffer())
                .pipe(imagemin())
                .pipe(gulp.dest(path.sprite.dest.sprite_img_pc)),
            /**
             * pipe CSS stream through CSS optimizer and onto disk
             */
            spriteData.css
                .pipe(gulp.dest(path.sprite.dest.sprite_css_pc))
        );
    });
}

