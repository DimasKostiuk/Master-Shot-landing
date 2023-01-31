import ansiColors from 'ansi-colors';
import gulp from 'gulp';

import { bundles } from '../configs/bundles.js';

import { runActions } from './actions.js';
import { findBundlesByTask } from './finder.js';
import { logger } from './logger.js';
import { createGlob } from './paths.js';

export const build = (task) =>
  Promise.all(
    bundles
      .filter((bundle) => findBundlesByTask(bundle, task))
      .map(async (bundle) => {
        let src = gulp.src(
          createGlob(bundle.src, bundle.files.pattern, bundle.files.ext),
        );

        src = await runActions(src, bundle.actions);

        src
          .pipe(gulp.dest(bundle.dest))
          .on('end', () => {
            logger.log(`${ansiColors.green(task)}:`, bundle.dest);
          })
          .on('error', logger.error);
      }),
  );
