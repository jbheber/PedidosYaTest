var gulp = require("gulp");
var ts = require("gulp-typescript");
var path = require("path");
var sourcemaps = require("gulp-sourcemaps");
var cleanCompiledTypeScript = require('gulp-clean-compiled-typescript');


gulp.task("build", function () {
    var tsProject = ts.createProject(path.resolve("./server/tsconfig.json"));
    var tsResult = gulp.src([
        "server/**/*.ts",
        "!server/typings/browser/**/*.ts",
        "!server/typings/browser.d.ts"])
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.resolve('./dist')));

});

gulp.task("clean", function () {
    return gulp.src(
        "./server/**/*.ts")
        .pipe(cleanCompiledTypeScript());
});

gulp.task("default", ["build"]);