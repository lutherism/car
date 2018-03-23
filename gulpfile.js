var gulp = require('gulp');
var del = require('del');
var browserify = require('browserify');
var babelify = require("babelify");
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var log = require('gulplog');
var spawn = require('child_process').spawn;
var runSequence = require('run-sequence');
var server;

function startServer() {
  server = spawn('babel-node', [
    '--presets', 'es2015',
    './controller/server/app.js'], {
      stdio: 'inherit'
    });
}

function closeServer() {
  if (server) {
    server.kill('SIGQUIT');
  }
}

process.on('exit', closeServer);

gulp.task('clean', function() {
  closeServer();
  return del([
    'dist/**',
    'dist-static/**',
    'dist-client/**']);
});

var clientBundler = browserify({
  entries: './controller/client/index.js',
  debug: true,
  transform: [babelify.configure({
    presets: ["env"]
  })]
});

gulp.task('build:client', function() {
  return clientBundler.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', log.error)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist-client/'));
});

gulp.task('build:static', ['clean'], function() {
  return gulp.src(['./controller/static/**'])
    .pipe(gulp.dest('./dist-static/'))
})

gulp.task('build', ['clean', 'build:client', 'build:static']);

gulp.task('serve', ['clean', 'build'], () => {
  startServer();
});

gulp.task('watch:build', ['serve'], function() {
  return gulp.watch(['./controller/**/**.js'], ['build']);
});

gulp.task('default', ['watch:build']);
