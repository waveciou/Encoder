const gulp = require('gulp'),
  babel = require('gulp-babel'),
  gulpUglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  htmlmin = require('gulp-htmlmin');

gulp.task('htmlmin', function () {
  return gulp.src('./assets/*.html').pipe(htmlmin({
    collapseWhitespace: true
  })).pipe(gulp.dest('./'));
});

gulp.task('babel', () => {
  return gulp.src([
    './common/js/plugins/vue.min.js',
    './common/js/plugins/axios.min.js',
    './common/js/_develop/*.js'
  ]).pipe(babel({
    presets: [
      ['env', {
        loose: true,
        modules: false,
      }]
    ]
  })).pipe(gulpUglify()).pipe(concat('main.js')).pipe(gulp.dest('./common/js'));
});

gulp.task('default', gulp.parallel(['htmlmin', 'babel']));