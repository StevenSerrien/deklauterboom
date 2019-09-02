'use strict';

import path from 'path';
import gulp from 'gulp';
import { plugins, args, config, taskTarget, browserSync } from '../utils';
const embedSvg = require('gulp-embed-svg');

let dirs = config.directories;
let dest = path.join(taskTarget);

// Copy
gulp.task('embedsvg', () => {
  return gulp.src('./docs/index.html')
  .pipe(embedSvg(
    {
      root: './docs',
      createSpritesheet: true,
      selectors: '.inline-svg'
    }
  ))
  .pipe(gulp.dest('./docs'));
});
