var gulp = require('gulp'),
    rename = require('gulp-rename'),
    copyFile = require('gulp-copy'),
    clean = require('gulp-clean'),
    markdown = require('gulp-markdown'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    fs = require('fs'),
    ghPages = require('gulp-gh-pages'),
    htmlmin = require('gulp-htmlmin'),
    copy=require('gulp-file-copy');

var copyPath = '../resume/resume/**/*',
    fileOutPath = 'file/',
    htmlPath = 'html/',
    imgPath = 'file/**/*.png',
    blogPath = '../blog-kin/';

// copy文件
gulp.task('copyFile', ['cleanFile'], function() {
    return gulp.src([copyPath+'.md',copyPath+'.png'])
      .pipe(gulp.dest(fileOutPath));
});

// 删除文件
gulp.task('cleanFile', function() {
    return gulp.src([fileOutPath,htmlPath], {read: false}).pipe(clean());
});

// copy图片
gulp.task('copyImg', ['copyFile'], function() {
    return gulp.src(imgPath).pipe(gulp.dest(htmlPath));
});
var style;
var options = {
    removeComments: false, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
};

    var headerHtml = '<!DOCTYPE html>'+
'<html lang="zh-CN">'+
'<head>'+
'    <title>笔记 by kin</title>'+
'    <link rel="stylesheet" href="https://cuikangjie.github.io/blog-kin/lib/css/style.css">'+
'    <link rel="icon" href="https://cuikangjie.github.io//blog-kin/lib/img/title.ico" type="image/x-icon">'+
'    <!-- <link rel="stylesheet" href="style.css"> -->'+
'</head>'+
'<body>'+
'    <div class="left-main">'+
'        <div class="own-img">'+
'            <a href="https://cuikangjie.github.io/resume/"><img src="https://cuikangjie.github.io//blog-kin/lib/img/kin.png"></a>'+
'        </div>'+
'        <div class="own-name"><a href="https://cuikangjie.github.io/resume/">kin</a></div>'+
'        <div class="own-main" id="num"></div>'+
'        <div class="own-addr" id="addr"></div>'+
'        <div class="own-share">'+
'            <a href="https://github.com/cuikangjie" target="_blank"><img src="https://cuikangjie.github.io//blog-kin/lib/img/github.png"></a>'+
'            <a href="https://cuikangjie.github.io//blog-kin/"><img src="https://cuikangjie.github.io//blog-kin/lib/img/biji.png"></a>'+
'            <a href="http://www.cnblogs.com/kin-jie/"><img src="https://cuikangjie.github.io//blog-kin/lib/img/blog.png"></a>'+
'            <a href="http://www.jianshu.com/users/9fc42ce7c150/latest_articles"><img src="https://cuikangjie.github.io//blog-kin/lib/img/jian.png"></a>'+
'            <a href="mailto:cuikangjie_90h@126.com"><img src="https://cuikangjie.github.io//blog-kin/lib/img/email.png"></a>'+
'<a href="javascript:window.print();"><img src="https://cuikangjie.github.io//blog-kin/lib/img/print.png"></a>'+
'        </div>'+
'    </div>'+
'    <div class="right-main">';

    var footerHtml = '</div>'+
'    <!-- 获取ip-->'+
'    <script src="https://pv.sohu.com/cityjson?ie=utf-8"></script>'+
'    <script src="https://cuikangjie.github.io/blog-kin/lib/js/bmob-min.js"></script>'+
'    <script src="https://cuikangjie.github.io/blog-kin/lib/js/app.js"></script>'+
'</body>'+
'</html>';



// markdown转换html
gulp.task('changeHtml', ['copyFile'], function() {
  return gulp.src(fileOutPath + '**/*.md').pipe(markdown()).pipe(header(headerHtml)).pipe(footer(footerHtml)).pipe(htmlmin(options))
        .pipe(gulp.dest(htmlPath));
});

gulp.task('rename', function() {
    gulp.src('html/README.html').pipe(htmlmin(options)).pipe(rename({basename: 'index'})).pipe(clean()).pipe(gulp.dest(htmlPath))

});
gulp.task('cleanReadme', ['rename'], function() {
    return gulp.src('html/README.html').pipe(clean())
});

gulp.task('copyToBlog', ['cleanReadme'], function() {
    gulp.src([htmlPath+'index.html',htmlPath + '**/*.html',htmlPath + '**/*.png']).pipe(gulp.dest(blogPath));
});

gulp.task('server', ['changeHtml'], function() {});
