const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${RoomName}`
}
function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", {payload: input.value}, showRoom); // 이벤트 이름, 페이먼트, 함수
    input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);