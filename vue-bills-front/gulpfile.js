var gulp = require('gulp');

gulp.task('default', function () {
	console.log("Initializing Default task.");
	gulp.src('./node_modules/materialize-css/fonts/roboto/**/*')
		.pipe(gulp.dest('./dist/fonts/roboto'));
});