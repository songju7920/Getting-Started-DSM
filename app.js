const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const { sequelize } = require("./models/index");
const router = require("./router/index");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");

const port = process.env.port || 8080;

//view engine 설정
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//메소드 설정
app.use(methodOverride("_method"));

//쿠키 파싱 미들웨어 등록
app.use(cookieparser());

//session 설정
app.use(
  session({
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: true,
  })
);

//json, url 파싱 미들웨어 등록
app.use(bodyparser.json({}));
app.use(bodyparser.urlencoded({ extended: true }));

//router설정 및 정적화면(css, html)루트 설정
app.use("/", express.static(path.join(__dirname, "./views")));
app.use("/", router);

//서버 실행
app.listen(port, () => {
  console.log(`server is listening in port ${port}`);
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("success to connect to database!");
    })
    .catch((err) => {
      console.error(err);
    });
});
