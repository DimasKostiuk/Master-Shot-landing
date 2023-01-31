import { project } from './project.js';

const src = './source/';
const dev = './dev/';
const prod = './public/';
const build = project.IS_DEV ? dev : prod;
const assets = {
  js: 'js/',
  css: 'css/',
  fav: 'favicon/',
  img: 'images/',
  data: 'data/',
  svg: 'svg/',
  fonts: 'fonts/',
  layout: 'layout/',
};

export const paths = {
  src,
  dev,
  prod,
  build,
  assets,
  actions: '../actions/',
  includes: '../includes/',
  clean: [dev, prod].flatMap((path) => [`${path}*`, `!${path}.gitignore`]),
  copy: [
    {
      src: `${src + assets.fonts}**/*.*`,
      dest: build + assets.fonts,
    },
    {
      src: `${src + assets.fav}*.svg`,
      dest: build + assets.img + assets.fav,
    },
    {
      src: `${src + assets.fav}*.png`,
      dest: build + assets.img + assets.fav,
    },
    {
      src: `${src + assets.fav}*.xml`,
      dest: build,
    },
    {
      src: `${src + assets.fav}*.webmanifest`,
      dest: build,
    },
    {
      src: `${src + assets.fav}*.ico`,
      dest: build,
    },
  ],
};
