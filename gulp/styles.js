const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const { style } = require("./_const");

const styles = () => {
  return src(style.main, { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(style.dest, { sourcemaps: "." }));
};

module.exports = styles;
