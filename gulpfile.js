const gulp = require("gulp");
// const browserSync = require("browser-sync"); //ブラウザ反映
// const plumber = require("gulp-plumber"); //エラー時の強制終了を防止

//lessの設定
const less = require("gulp-less"); //Sassコンパイル
// const notify = require("gulp-notify"); //エラー発生時にデスクトップ通知する
var path = require("path");
// const postcss = require("gulp-postcss"); //autoprefixerとセット
// const autoprefixer = require("autoprefixer"); //ベンダープレフィックス付与
// const cssdeclsort = require("css-declaration-sorter"); //css並べ替え
const LessAutoprefix = require("less-plugin-autoprefix");
const autoprefix = new LessAutoprefix({ browsers: ["last 2 versions"] });

// scssのコンパイル
gulp.task("less", function () {
  return (
    gulp
      .src("./src/less/**/*.less")
      // .pipe(
      //   plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
      // ) //エラーチェック
      .pipe(
        less({
          paths: [path.join(__dirname, "less", "includes")],
          outputStyle: "compressed", //expanded, nested, campact, compressedから選択
          plugins: [autoprefix],
        })
      )
      // .pipe(postcss([cssdeclsort({ order: "alphabetical" })])) //プロパティをソートし直す(アルファベット順)
      .pipe(gulp.dest("./dist/css"))
  ); //コンパイル後の出力先
});

// // 保存時のリロード
// gulp.task("browser-sync", function (done) {
//   browserSync.init({
//     server: {
//       //ローカル開発
//       baseDir: "./public",
//       index: "index.html",
//     },
//   });
//   done();
// });

// // リロード
// gulp.task("bs-reload", function (done) {
//   browserSync.reload();
//   done();
// });

// 監視
// gulp.task("watch", function (done) {
//   gulp.watch("./src/less/**/*.less", gulp.task("less")); //sassが更新されたらgulp sassを実行
//   // gulp.watch("./src/less/**/*.less", gulp.task("bs-reload")); //sassが更新されたらbs-reloadを実行
//   done();
// });

// ブラウザ
// gulp.task("default", gulp.series(gulp.parallel("browser-sync", "watch")));
