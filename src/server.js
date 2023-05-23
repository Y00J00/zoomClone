import http from "http";
import express from "express";
import { WebSocketServer } from "ws";

const app = express();

app.set('view engine', "pug"); // pug로 view engine 설정
app.set("views", __dirname + "/views"); //express 에 template이 어디 있는지 설정
app.use("/public", express.static(__dirname + "/public")); // public url 생성해서 유저에게 파일 공유. public 폴더를 유저에게 공유
app.get("/", (_, res) => res.render("home")); //home.pug를 render해주는 route handler
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`listening on http://localhost:3000`);
//const handleListen = () => console.log(`listening on ws://localhost:3000`); 도 가능

const server = http.createServer(app);

const wss = new WebSocketServer({ server }); //http서버 위에 webSocket서버를 만듬

function handleConnection(socket) {
    console.log(socket);
}
wss.on("connection", handleConnection)

server.listen(3000, handleListen);
// dev는 nodemon을 호출하고 nodemon은 호출되면 nodemon.json안의 코드를 실행함