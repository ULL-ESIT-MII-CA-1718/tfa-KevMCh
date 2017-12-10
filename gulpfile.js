var gulp = require("gulp");
var shell = require("gulp-shell");

gulp.task("pre-install", shell.task([
      "brew update && brew install mongodb"
]));

gulp.task("services", shell.task("brew services list"));

gulp.task("start", shell.task("((test -d data) || (mkdir data))  && (mongod --dbpath data)"));

gulp.task("stop", shell.task("mongo ./stop-mongod.js"));
