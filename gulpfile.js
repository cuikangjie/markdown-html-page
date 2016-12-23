var gulp=require('gulp'),
    rename=require('gulp-rename'),
    copyFile=require('gulp-copy'),
    clean=require('gulp-clean'),
    markdown=require('gulp-markdown'),
    header=require('gulp-header'),
    footer=require('gulp-footer'),
    fs= require('fs'),
    ghPages = require('gulp-gh-pages'),
    htmlmin = require('gulp-htmlmin');

var copyPath='../notes/**/*',
    fileOutPath='file/',
    htmlPath='html/',
    imgPath='file/**/*.png',
    blogPath='../blog-kin/';

// copy文件
gulp.task('copyFile',['cleanHtml'],function(){
    return   gulp.src(copyPath)
        // .pipe(copyFile(fileOutPath))
        .pipe(gulp.dest(fileOutPath));
});

// 删除文件
gulp.task('cleanFile',function(){
    return gulp.src(fileOutPath,{read: false})
        .pipe(clean())
});

// 删除html文件
gulp.task('cleanHtml',['cleanFile'],function(){
  return gulp.src(htmlPath,{read: false})
      .pipe(clean())
})


// copy图片
gulp.task('copyImg',['copyFile'],function(){
    return   gulp.src(imgPath)
        .pipe(gulp.dest(htmlPath));
});
var style;
var options = {
    removeComments: false,//清除HTML注释
    collapseWhitespace: false,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
};
var changeHtml=function(){
  var headerHtml= '<!DOCTYPE html>'+
      '<html lang="zh-CN">'+
      '<head>'+
      '<title>cuikangjie</title>'+
      style+
      '</head><body>';
  var footerHtml='</body></html>';
  return gulp.src(fileOutPath+'**/*.md')
      .pipe(markdown())
      .pipe(header(headerHtml))
      .pipe(footer(footerHtml))
      .pipe(htmlmin(options))
      // .pipe(rename({suffix:'.min'}))
      .pipe(gulp.dest(htmlPath))
};

// markdown转换html
gulp.task('changeHtml',['copyImg'],function(){
  fs.readFile('lib/style.css','utf-8',function(err,data){
    if(err){
        console.log('读取style失败');
    }else{
      console.log('读取style');
      style='<style>'+data+'</style>';
      changeHtml();
    }
  });
});

gulp.task('rename', function() {
   gulp.src('html/README.html')
   .pipe(htmlmin(options))
   .pipe(rename({basename:'index'}))
   .pipe(clean())
   .pipe(gulp.dest(htmlPath))

});
gulp.task('cleanReadme',['rename'], function() {
   return gulp.src('html/README.html')
   .pipe(clean())
});

gulp.task('copyToBlog',['cleanReadme'],function(){
     gulp.src(htmlPath+'**/*')
        .pipe(gulp.dest(blogPath));
});

gulp.task('server',['changeHtml'],function(){

});
