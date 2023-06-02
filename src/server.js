import http from "http";
import express from "express";
import { WebSocketServer } from "ws";
import SocketIO from "socket.io";
import path from "path";

const app = express();
//__dirname 선언
const __dirname = path.resolve();
console.log(__dirname);
app.set('view engine', "pug"); // pug로 view engine 설정
// app.set("views", __dirname + "/views"); //express 에 template이 어디 있는지 설정
app.set("views", path.join(__dirname + '/src/views')); //express 에 template이 어디 있는지 설정


app.use("/public", express.static(__dirname + "/src/public")); // public url 생성해서 유저에게 파일 공유. public 폴더를 유저에게 공유
app.get("/", (_, res) => res.render("home")); //home.pug를 render해주는 route handler
app.get("/*", (_, res) => res.redirect("/"));


const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer)

wsServer.on("Connection", (socket) => {
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome");// 방에 참ㄱ
    });
    socket.onAny((event) => {
       
    });
    socket.on("disconnecting",  () => {
        socket.rooms.forEach(room => socket.to(room).emit("bye"));
    })

    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", msg);
        done();
    })
})
// const server = http.createServer(app); // 서버 만들기
// const wss = new WebSocketServer({ server }); // http서버 위에 webSocket서버를 만듬 -> 이렇게 하면 같은 서버에서 http , ws 둘다 작동시킬수 있다.
// //포트 3000에 두 개의 서버 

function handleConnection(socket) { // 콜백으로 소켓 받았음.
    console.log(socket);
    // server.js의 socket은 연결된 웹 브라우저
    // app.js의 socket은 서버로의 연결
}
//wss.on("connection", handleConnection) 
// on 메소드에서는 이벤트가 발동하는 것을 기다림 + 벡엔드에 연결된 사람의 정보를 제공 (소켓에서)
//connection 이벤트가 이루어지면 handleConnection을 발생시킴. 이때 callback으로 socket을 받음. 
// socket => 나(서버)와 브러우저 사이의 연결. 연결된 브러우저와의 컨택라인. 소켓을 이용하여 메세지를 주고 받을수 있음

wsServer.listen(3000, handleListen);
// dev는 nodemon을 호출하고 nodemon은 호출되면 nodemon.json안의 코드를 실행함 -> npm run dev


