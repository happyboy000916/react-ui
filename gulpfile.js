var gulp = require('gulp')
var webdriver = require('gulp-webdriver')

gulp.task('test:e2e', function () {
  return gulp.src('wdio.conf.js')
    .pipe(webdriver({
      logLevel: 'verbose',
      waitforTimeout: 10000,
      reporter: 'spec'
    }))
})
