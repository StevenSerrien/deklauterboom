/*eslint no-process-exit:0 */

'use strict';

import path from 'path';

const svgSprite = require('gulp-svg-sprite');

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = taskTarget;

  gulp.task('svgsprite', () => {
    return gulp.src(path.join(dirs.source, dirs.images, '/svg-sprite/*.svg'))
      .pipe(svgSprite())
      .pipe(gulp.dest(dest));
  });

}
