var gulp =          require('gulp');
var assemble =      require('assemble');

var gulpAssemble =  require('gulp-assemble');
var coffee =        require('gulp-coffee');
var concat =        require('gulp-concat');
var imagemin =      require('gulp-imagemin');
var litmus =        require('gulp-litmus');
var mailgun =       require('gulp-mailgun');
var sass =          require('gulp-sass');
var sourcemaps =    require('gulp-sourcemaps');
var uglify =        require('gulp-uglify');
var fs =            require('fs');
//var del = require('del');
var secrets = JSON.parse(fs.readFileSync('./secrets.json'));

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('sass', function () {
  gulp.src('./src/css/scss/main.scss')
    .pipe(sass())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./src/css/'));

  gulp.src('./preview/scss/preview.scss')
    .pipe(sass())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./preview/css/'));
});

gulp.task('mailgun', function () {
  gulp.src('./dist/ink_basic.html') // Modify this to select the HTML file(s)
  .pipe(mailgun({
    key: secrets.mailgun.api_key, // Enter your Mailgun API key here
    sender: secrets.mailgun.sender,
    recipient: secrets.mailgun.recipient,
    subject: 'This is a test email'
  }));
});

gulp.task('litmus', function () {
  gulp.src('./dist/ink_basic.html')
    .pipe(litmus({
        username: secrets.litmus.username,
        password: secrets.litmus.password,
        url: secrets.litmus.url,
        applications: [
          'android4',
          'aolonline',
          'aolonline',
          'ffaolonline',
          'chromeaolonline',
          'iphone6',
          'ipadmini',
          'ipad',
          'chromegmailnew',
          'iphone6plus',
          'notes85',
          'ol2002',
          'ol2003',
          'ol2007',
          'ol2010',
          'ol2011',
          'ol2013',
          'outlookcom',
          'chromeoutlookcom',
          'chromeyahoo',
          'windowsphone8'
        ],
      }))
    .pipe(gulp.dest('./dist'));
});





gulp.task('assemble', function () {
  gulp.src('./src/emails/*.hbs')
    .pipe(gulpAssemble(assemble, {
      layoutdir: './src/layouts',
      partials: ['./src/partials/**/*.hbs'],
      helpers: ['./src/helpers/**/*.js'],
      data: ['./src/data/*.{json,yml}'],
      flatten: true
      }))
    .pipe(gulp.dest('dist'));
});

// assemble: {
//   options: {
//     layoutdir: './src/layouts',
//     partials: ['./src/partials/**/*.hbs'],
//     helpers: ['./src/helpers/**/*.js'],
//     data: ['./src/data/*.{json,yml}'],
//     flatten: true
//   },
//   pages: {
//     src: ['<%= paths.src %>/emails/*.hbs'],
//     dest: '<%= paths.dist %>/'
//   }
// },
