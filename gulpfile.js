const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const pug = require("gulp-pug");
const rename = require("gulp-rename");
const sass = require("gulp-sass");

function coco_css() {
    return gulp
        .src("./src/*.scss")
        .pipe(
            sass({
                outputStyle: "compact",
                precision: 10,
            }).on("error", sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(cleancss())
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(gulp.dest("./css"));
}

function docs_pug() {
    return gulp
        .src("./docs/src/**/!(_)*.pug")
        .pipe(
            pug({
                pretty: true,
                data: {
                    version: "0.0.1",
                },
            })
        )
        .pipe(gulp.dest("./docs"));
}

function docs_css() {
    return gulp
        .src(["./src/*.scss", "./docs/*.scss"])
        .pipe(
            sass({
                outputStyle: "compact",
                precision: 10,
            }).on("error", sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(gulp.dest("./docs/css"))
        .pipe(cleancss())
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(gulp.dest("./docs/css"));
}

function serve(done) {
    browserSync.init({
        open: true,
        server: "docs",
    });

    done();
}

function reload(done) {
    browserSync.reload();
    done();
}

function watch() {
    gulp.watch("./**/*.scss", gulp.series(coco_css, docs_css, reload));
    gulp.watch("./**/*.pug", gulp.series(docs_pug, reload));
}

exports.serve = gulp.series(
    coco_css,
    docs_pug,
    docs_css,
    gulp.parallel(serve, watch)
);
exports.default = coco_css;
