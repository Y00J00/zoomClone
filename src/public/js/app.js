
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");



// 프론트와 벡엔드 연결
const socket = new WebSocket(`ws://${window.location.host}`); 

socket.addEventListener("open", () => { // connection이 되었을때
    console.log('connected to server');
})

socket.addEventListener("message", (message) => { // 메세지를 받을때마다 
    console.log(message.data)
})

socket.addEventListener("close", () => { // 서버 연결이 끊어질때

    console.log('close to server');
})

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = '';
}

messageForm.addEventListener("submit", handleSubmit);
// ws에는 listen할 특정한 event명이 있고
// ws에서도 추가적인 정보를 받을 function이 존재


// server.js의 socket은 연결된 웹 브라우저
// app.js의 socket은 서버로의 연결