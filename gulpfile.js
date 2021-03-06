//npm install --save-dev gulp gulp-sass sass gulp-concat gulp-terser gulp-cssnano gulp-autoprefixer browser-sync

//initializing modules
const 
      gulp         = require('gulp'),
      sass         = require('gulp-sass') (require('sass')),
      concat       = require('gulp-concat'),
      terser       = require('gulp-terser'),
      cssnano      = require('gulp-cssnano'),
      autoprefixer = require('gulp-autoprefixer'),
      browsersync  = require('browser-sync').create(),
      reload       = browsersync.reload;


//file path variables
const files = {
  html  :  ['*.html'], 
  scss  :  ['src/scss/style.scss', 'src/scss/**/*.scss', 'dist/css/'],
  js    :  ['src/js/script.js',    'src/js/**/*.js',     'dist/js/' ]
}


//scss to css task
const scssMini = () => {
  return gulp.src(files.scss[0], {sourcemaps: false })
              .pipe(sass().on('error', sass.logError))
              .pipe(autoprefixer({overrideBrowserslist : ['last 2 versions']}))
              .pipe(concat('style.css'))
              // .pipe(cssnano())
            .pipe(gulp.dest(files.scss[2], {sourcemaps: '.' }));
}
const scss = () => {
  return gulp.src(files.scss[0], {sourcemaps: false })
              .pipe(sass().on('error', sass.logError))
              .pipe(autoprefixer({overrideBrowserslist : ['last 2 versions']}))
              .pipe(concat('style.css'))
              // .pipe(cssnano())
            .pipe(gulp.dest(files.scss[2], {sourcemaps: '.' }));
}
//scss to css watcher task
const watchScss = () => {
  scssMini();
  return gulp.watch(files.scss[1], scssMini);
}

 
//js task
const js = () => {
  return gulp.src(files.js[1], {sourcemaps: false })
              .pipe(concat('script.js'))
              // .pipe(terser())
            .pipe(gulp.dest(files.js[2], {sourcemaps: '.' }));
}
//js watcher task
const watchJs = () => {
  js();
  return gulp.watch(files.js[1], js);
}


//browsersync tasks
const browsersyncServe = () => {
  browsersync.init({
    server: {
      baseDir: '.'
    }
  });
}


//default watcher task
const mainTask = () => {
  scssMini();
  js();
  browsersyncServe();
  gulp.watch(files.html[0]).on('change', reload); 
  gulp.watch(files.scss[1]).on('change', gulp.series(scssMini, reload));
  gulp.watch(files.js[1]).on('change', gulp.series(js, reload));
}
 
exports.js      = watchJs;         //run this command for js task only
exports.scss    = watchScss;       //run this command for scss task only
exports.css     = scss;            //run this command for exporting css normal file not minified
exports.default = mainTask;        //default command that runs everything
