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


// gulp.task('copyWWW', function() {
//    gulp.src('./www/**/*')
//    .pipe(gulp.dest('../App1/www'))
//    .pipe(gulp.dest('../AppMap/www'))
//    .pipe(gulp.dest('../Benzie County/www'));
// });
//
// gulp.task('copyWWW', function() {
//    gulp.src('./www/**/*')
//    ;
// });
//
// gulp.task('copyWWW', function() {
//    gulp.src('./www/**/*')
//    ;
// });
