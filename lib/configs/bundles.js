import { mozjpeg, optipng, svgo } from 'gulp-imagemin';

import { paths } from './paths.js';
import { project } from './project.js';

const actions = {
  html: {
    nunjucks: { path: paths.src + paths.assets.layout },
    prettify: {
      indent_size: 2,
      unformatted: ['pre', 'code'],
    },
  },
  css: {
    scss: { includePaths: ['node_modules'] },
    cleanCss: undefined,
    rename: { suffix: project.minSuffix },
  },
  js: { webpack: undefined },
  img: {
    imagemin: [
      mozjpeg({ progressive: true }),
      optipng(),
      svgo({
        plugins: [{ name: 'removeViewBox', active: false }],
      }),
    ],
  },
  svg: {
    symbols: { class: '.icon--%f', templates: ['default-svg'] },
  },
};

if (project.IS_DEV) {
  delete actions.css.cleanCss;
  delete actions.css.rename;
  delete actions.img.imagemin;
}

export const bundles = [
  {
    type: 'html',
    src: paths.src + paths.assets.layout,
    dest: paths.build,
    files: {
      pattern: '*',
      ext: 'njk',
    },
    actions: actions.html,
    watching: {
      pattern: '**/',
    },
  },
  {
    type: 'css',
    src: paths.src + paths.assets.layout,
    dest: paths.build + paths.assets.css,
    files: {
      pattern: '*',
      ext: 'scss',
    },
    actions: actions.css,
    watching: {
      pattern: '**/',
      ext: '*scss',
    },
  },
  {
    type: 'js',
    src: paths.src + paths.assets.js,
    dest: paths.build + paths.assets.js,
    files: {
      pattern: '**/*',
      ext: 'js',
    },
    actions: actions.js,
  },
  {
    type: 'img',
    src: paths.src + paths.assets.img,
    dest: paths.build + paths.assets.img,
    files: {
      pattern: '**/*',
      ext: '*(img|png|svg)',
    },
    actions: actions.img,
  },
  {
    type: 'img',
    src: paths.src + paths.assets.data,
    dest: paths.build + paths.assets.data,
    files: {
      pattern: '**/*',
      ext: '*(img|png|svg)',
    },
    actions: actions.img,
  },
  {
    type: 'svg',
    src: paths.src + paths.assets.svg,
    dest: paths.build + paths.assets.img,
    files: {
      pattern: '**/*',
      ext: 'svg',
    },
    actions: actions.svg,
  },
];
