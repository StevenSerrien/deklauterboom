'use strict';

import path from 'path';
import gulpif from 'gulp-if';
// import pngquant from 'imagemin-pngquant';
// import mozjpeg from 'imagemin-mozjpeg';
// const pngquant = require('imagemin-pngquant');
// const mozjpeg = require('imagemin-mozjpeg');
// const imagemin = require('gulp-imagemin');

// const rename = require("gulp-rename");
// const imageminOptipng = require('imagemin-optipng');
// const image = require('gulp-image');
// const imageminJpegRecompress = require('imagemin-jpeg-recompress');

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget, dirs.images.replace(/^_/, ''));

  // Imagemin
  gulp.task('lqip', () => {
    return gulp.src(path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,png}'))
        // .pipe(
        //   image({
        //     jpegRecompress: ['--strip', '--quality', 'high', '--min', 50, '--max', 70],
        //     jpegoptim: false,
        //     mozjpeg: true,
        //     concurrent: 10
        //   })
        // )
      .pipe(imagemin(
        [
          pngquant({quality: [10, 10]}),
          mozjpeg({quality: 50})
          // pngquant({quality: 1, speed: 1}),
          // imageminJpegRecompress({
          //   loops:4,
          //   min: 50,
          //   max: 95,
          //   quality:'low'
          // })
          // pngquant({quality: 1, speed: 1}),
          // imageminOptipng({optimizationLevel: 7}),
          // mozjpeg({quality: 1})
        ],
        // { use: [] }
        // imagemin.pngquant(),
      ))
      .pipe(rename(function (path){
        path.basename += '-lqip';
      }))
      .pipe(gulp.dest(dest));
  });
}
