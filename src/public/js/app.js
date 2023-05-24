// 프론트와 벡엔드 연결
const socket = new WebSocket(`ws://${window.location.host}`); 


// ws에는 listen할 특정한 event명이 있고
// ws에서도 추가적인 정보를 받을 function이 존재


//server.js의 socket은 연결된 웹 브라우저
// app.js의 socket은 서버로의 연결