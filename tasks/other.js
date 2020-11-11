const { src, dest } = require('gulp');
const replace = require('replace-in-file');
// Configs
const { mode, config } = require('../project.config');
const { source, build } = config;

/**
 * Copy rest from "src/" to "build/"
 */
const copyRootOther = () => {
  return src([
    `${source}/*.*`,
    `${source}/.*`,
    `!${source}/index.html`,
    `!${source}/404.html`,
    `!${source}/index.php`,
    `!${source}/404.php`,
  ]).pipe(dest(`${build}`));
};

/**
 * Copy Custom
 */
const copyCustom = (sources = [], dests = `${build}`) => () => {
  return src(sources).pipe(dest(dests));
};

/**
 * Copy Icon Fonts
 */
const copyIconFonts = async () => {
  try {
    const resChangefontDisplay = await replace({
      files: `${source}/modules/app-icon-font/style.scss`,
      from: /font-display: block;/g,
      to: 'font-display: swap;',
    });

    const resRemoveSvgFont = await replace({
      files: `${source}/modules/app-icon-font/style.scss`,
      from: /(,[.\r\n].*format\('svg'\))/igm,
      to: '',
    });

    console.log('Changing Font Display to "swap":', resChangefontDisplay);
    console.log('Removing SVG Font:', resRemoveSvgFont);
  } catch (error) {
    console.error('Error replacing "AppIconFont" files:', error);
  }

  return src([
    `${source}/modules/app-icon-font/fonts/*.{woff,ttf}`,
  ]).pipe(dest(`${source}/fonts/AppIconFont`));
};

module.exports = {
  copyRootOther,
  copyCustom,
  copyIconFonts,
};
