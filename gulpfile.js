
const gulp = require("gulp");
const less = require("gulp-less");//引入less插件
const sass = require("gulp-sass");//引入sass插件
const csso = require("gulp-csso");//引入css压缩插件
const connect = require("gulp-connect");//引入本地服务器插件


//less转css 这里顺带复制了其他css，具体看数组里的路径
gulp.task("less",async()=>{
    gulp.src("./src/css/*.less")
    .pipe(less())//可以选择要不要压缩 csso
    .pipe(csso())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})
//sass转css
gulp.task("sass",async()=>{
    gulp.src("./src/css/**.scss")
    .pipe(sass())
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

//设置监听
gulp.task("auto",async()=>{
   gulp.watch("./src/css/*.less",gulp.series("less"));
   gulp.watch("./src/css/*.scss",gulp.series("sass"));
   
} )

//设置connect
gulp.task("server",async(cb)=>{
    connect.server({
        root:"dist",
        port:8888,
        livereload:true
    })
    cb()
})




gulp.task("default",gulp.parallel("server","sass","less","auto"))

