/// <binding BeforeBuild='default' />
var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('copyAppMapp', function(){
  gulp.src('../AppMap/config.xml')
  .pipe(gulp.dest('./'));

  gulp.src('../AppMap/settings.js')
  .pipe(gulp.dest('./www/js/'));

  gulp.src('../AppMap/resources/**/*')
  .pipe(gulp.dest('./resources/'));

  gulp.src('../AppMap/res/**/*')
  .pipe(gulp.dest('./www/res/'))
});

gulp.task('copyBenzie', function(){
  gulp.src('../Benzie County/config.xml')
  .pipe(gulp.dest('./'));

  gulp.src('../Benzie County/settings.js')
  .pipe(gulp.dest('./www/js/'));

  gulp.src('../Benzie County/resources/**/*')
  .pipe(gulp.dest('./resources/'));

  gulp.src('../Benzie County/res/**/*')
  .pipe(gulp.dest('./www/res/'))
});

gulp.task('copyBrazilianAmerican', function(){
  gulp.src('../Brazilian American/config.xml')
  .pipe(gulp.dest('./'));

  gulp.src('../Brazilian American/settings.js')
  .pipe(gulp.dest('./www/js/'));

  gulp.src('../Brazilian American/resources/**/*')
  .pipe(gulp.dest('./resources/'));

  gulp.src('../Brazilian American/res/**/*')
  .pipe(gulp.dest('./www/res/'))
});

gulp.task('copy1', function(){
  gulp.src('../1/config.xml')
  .pipe(gulp.dest('./'));

  gulp.src('../1/settings.js')
  .pipe(gulp.dest('./www/js/'));

  gulp.src('../1/resources/**/*')
  .pipe(gulp.dest('./resources/'));

  gulp.src('../1/res/**/*')
  .pipe(gulp.dest('./www/res/'))
});

gulp.task('copy2', function(){
  gulp.src('../2/config.xml')
  .pipe(gulp.dest('./'));

  gulp.src('../2/settings.js')
  .pipe(gulp.dest('./www/js/'));

  gulp.src('../2/resources/**/*')
  .pipe(gulp.dest('./resources/'));

  gulp.src('../2/res/**/*')
  .pipe(gulp.dest('./www/res/'))
});
