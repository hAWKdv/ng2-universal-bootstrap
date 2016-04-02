var gulp = require("gulp"),
    del = require("del"),
    http = require("http"),
    connect = require("connect"),
    serveStatic = require("serve-static"),
    typescript = require("gulp-typescript"),
    tscConfig = require("./tsconfig.json"),
    open = require("open");
    
var PATHS = {
    src: "src/**/*.ts",
    tests: "src/**/*.spec.ts",
    typings: "typings/browser.d.ts"
};

gulp.task("clean", function (done) {
    del(["dist", "tests"], done);
});

gulp.task("transpile.ts", function () {
    var tsResult = gulp
        .src([PATHS.typings, PATHS.src, "!" + PATHS.tests])
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js.pipe(gulp.dest("dist"));
});

gulp.task("test", function () {
    var tsResult = gulp
        .src([PATHS.typings, PATHS.tests])
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js.pipe(gulp.dest("tests"));
});

gulp.task("start", ["transpile.ts"], function () {
    var port = 9000,
        app;

    gulp.watch(PATHS.src, ["transpile.ts"]);

    app = connect().use(serveStatic(__dirname));
        http.createServer(app).listen(port, function () {
        open("http://localhost:" + port);
    });
});

gulp.task("default", ["start"]);
