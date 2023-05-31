// 프론트와 벡엔드 연결
const socket = new WebSocket(`ws://${window.location.host}`); 
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");


// ws에는 listen할 특정한 event명이 있고
// ws에서도 추가적인 정보를 받을 function이 존재
socket.addEventListener("open", handleOpen);

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText  = message.data;
    messageList.appen(li);
});

function handleNickSubmint(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = '';
}

function makeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);

//server.js의 socket은 연결된 웹 브라우저
// app.js의 socket은 서버로의 연결