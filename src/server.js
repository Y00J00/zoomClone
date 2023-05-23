import express from "express";

const app = express();

app.set('view engine', "pug"); // pug로 view engine 설정
app.set("views", __dirname + "/views"); //express 에 template이 어디 있는지 설정
app.use("/public", express.static(__dirname + "/public")); // public url 생성해서 유저에게 파일 공유. public 폴더를 유저에게 공유
app.get("/", (req, res) => res.render("home")); //home.pug를 render해주는 route handler
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`listening on http://localhost:3000`);

app.listen(3000, handleListen);
// dev는 nodemon을 호출하고 nodemon은 호출되면 nodemon.json안의 코드를 실행함