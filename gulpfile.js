const gulp = require("gulp");
const styles = require("./gulp/styles");
const sync = require("browser-sync").create();

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "source",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

async function syncStyles() {
  gulp.src("source/css/").pipe(sync.stream());
}

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles, syncStyles));
  gulp.watch("source/*.html").on("change", sync.reload);
};

exports.build = gulp.series(styles);
exports.default = gulp.series(styles, server, watcher);
