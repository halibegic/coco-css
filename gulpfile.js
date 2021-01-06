const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const header = require("gulp-header");
const pug = require("gulp-pug");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const pkg = require("./package.json");
var banner = [
    "/*!",
    " * <%= pkg.name %> v<%= pkg.version %>",
    " * <%= pkg.license %> License",
    " * <%= pkg.homepage %>",
    " */",
    "",
].join("\n");

function coco_css() {
    return gulp
        .src("./src/**/*.scss")
        .pipe(header(banner, { pkg: pkg }))
        .pipe(
            sass({
                outputStyle: "compact",
                precision: 10,
            }).on("error", sass.logError)
        )
        .pipe(autoprefixer())
        .pipe(gulp.dest("./dist"))
        .pipe(cleancss())
        .pipe(
            rename({
                suffix: ".min",
            })
        )
        .pipe(gulp.dest("./dist"));
}

function docs_pug() {
    return gulp
        .src("./docs/src/**/!(_)*.pug")
        .pipe(
            pug({
                pretty: true,
                data: {
                    version: pkg.version,
                    homepage: pkg.homepage,
                    path: pkg.path,
                },
            })
        )
        .pipe(gulp.dest("./docs"));
}

function docs_css() {
    return gulp
        .src(["./src/**/*.scss", "./docs/src/scss/**/*.scss"])
        .pipe(header(banner, { pkg: pkg }))
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

function docs_js() {
    return gulp
        .src("./docs/src/js/**/*.js")
        .pipe(gulp.dest("./docs/js"))
}

function serve(done) {
    browserSync.init({
        open: true,
        server: "docs",
        notify: false,
    });

    done();
}

function reload(done) {
    browserSync.reload();
    done();
}

function watch() {
    gulp.watch(
        ["./src/**/*.scss", "./docs/src/scss/**/*.scss"],
        gulp.series(coco_css, docs_css, reload)
    );

    gulp.watch("./docs/src/js/**/*.js", gulp.series(docs_js, reload));
    gulp.watch("./docs/src/**/*.pug", gulp.series(docs_pug, reload));
}

exports.serve = gulp.series(
    coco_css,
    docs_css,
    docs_js,
    docs_pug,
    gulp.parallel(serve, watch)
);

exports.default = coco_css;
