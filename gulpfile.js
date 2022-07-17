// get modules
const gulp = require("gulp");
const concat = require("gulp-concat");
const autoPrefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sass = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify-es").default;
const del = require("del");
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const gcmq = require("gulp-group-css-media-queries");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");

// created path
const path = "./build";

// created all gulp functions

// sass to css task
function preproc() {
	return gulp.src("./src/sass/styles.scss")
	.pipe(sass().on("error", sass.logError))
	.pipe(gcmq())
	.pipe(sourcemaps.init())
	.pipe(concat("styles.css"))
	.pipe(autoPrefixer({
		browsers: ["> 0.01%"],
		cascade: false
	}))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest("./build/css"))
	.pipe(browserSync.stream());
}

// styles task
function styles() {
	return gulp.src("./src/css/**/*.css")
	.pipe(gcmq())
	.pipe(sourcemaps.init())
	.pipe(autoPrefixer({
		browsers: ["> 0.01%"],
		cascade: false
	}))
	.pipe(cleanCSS({
		level: 2
	}))
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest("./build/css"))
	.pipe(browserSync.stream());
}

// JS wicth babel
function scripts () {
	return gulp.src("./src/js/**/*.js")
	.pipe(sourcemaps.init())
	.pipe(concat("all.js"))
	.pipe(babel({
		"presets": ["@babel/env"]
	}))
	.pipe(uglify({
		toplevel: true
	}))
	.pipe(sourcemaps.write("."))
	.pipe(gulp.dest("./build/js"))
	.pipe(browserSync.stream());
}

// IMGS TASK
function img() {
	return gulp.src("./src/img/**/*")
	.pipe(imagemin())
	.pipe(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.mozjpeg({quality: 75, progressive: true}),
		imagemin.optipng({optimizationLevel: 5}),
		imagemin.svgo({
			plugins: [
				{removeViewBox: true},
				{cleanupIDs: false}
			]
		})
	]))

	.pipe(gulp.dest("./build/img"))
}

// delete build folder and all files in build folder
function clean() {
	return del(["build/*"]);
}

// fonts folder from src folder to build folder
function fonts() {
	return gulp.src("./src/fonts/*")
	.pipe(gulp.dest("build/fonts"))
}

// libs folder from src folder to build folder
function libs() {
	return gulp.src("./src/libs/*")
	.pipe(gulp.dest("build/libs"))
}

// all html files from src folder to build folder
function htmls() {
	return gulp.src("./src/*.html")
	.pipe(gulp.dest("./build/"))
	.pipe(browserSync.stream());
}

function watch () {
	browserSync.init({
		server: {
			baseDir: path
		},
		// tunnel: true,
		online: true
	});

	gulp.watch("./src/libs/*", libs);
	gulp.watch("./src/js/**/*.js", scripts);
	gulp.watch("./src/sass/**/*.scss", preproc);
	gulp.watch("./src/css/**/*.css", styles);
	gulp.watch("./src/*.html", htmls);
	gulp.watch("./*.html").on("change", browserSync.reload);
}

// created gulp tasks

gulp.task("del", clean);
gulp.task("htmls", htmls);
gulp.task("sass", preproc);
gulp.task("styles", styles);
gulp.task("scripts", scripts);
gulp.task("imagemin", imagemin);
gulp.task("fonts", fonts);
gulp.task("libs", libs);

gulp.task("watch", watch);

gulp.task("build", gulp.series(clean, gulp.parallel(htmls, preproc, styles, scripts, img, fonts, libs)));

gulp.task("dev", gulp.series("build", "watch"));