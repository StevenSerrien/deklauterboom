'use strict';

import path from 'path';
import gulp from 'gulp';
import { plugins, args, config, taskTarget, browserSync } from '../utils';

const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const scaleImages = require('gulp-scale-images')

const rename = require("gulp-rename");
const flatMap = require('flat-map').default

const twoVariantsPerFile = (file, cb) => {
	const pngFile = file.clone()
	pngFile.scale = {maxWidth: 200, format: 'png'}
	const jpegFile = file.clone()
	jpegFile.scale = {maxWidth: 200,  format: 'jpeg'}
	cb(null, [pngFile, jpegFile])
}

const computeFileName = (output, scale, cb) => {
	const fileName = [
		path.basename(output.path), // strip extension
	];
	cb(null, fileName)
}

let dirs = config.directories;
let dest = path.join(taskTarget, dirs.images.replace(/^_/, ''));





  // LQIP
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

      .pipe(flatMap(twoVariantsPerFile))
      .pipe(scaleImages(computeFileName))
      .pipe(imagemin(
        [
          imageminMozjpeg({quality: 20})
          // pngquant({quality: [10, 10]}),
          // mozjpeg({quality: 50})
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

