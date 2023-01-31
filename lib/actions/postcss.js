import gulpPostcss from 'gulp-postcss';

import { logger } from '../helpers/logger.js';

export const postcss = (src, options) =>
  src.pipe(gulpPostcss(options)).on('error', logger.error);
