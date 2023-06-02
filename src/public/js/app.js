const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${RoomName}`;
    const msgForm = room.querySelector("#msg");
    const nameForm = room.querySelector("#name");

    msgForm.addEventListener("submit", handleMessageSubmit);
    nameForm.addEventListener("submit", handleMessageSubmit);

}


function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", input.value, () => {
        addMessage(`you ${value}`);
    });
}

function handleNicknameSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#name input");
    const value = input.value;
    socket.emit("nickname", input.value, () => {
        addMessage(`you ${value}`);
    });

}

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.querySelector("li");
    li.innerText = "someone joined";
    ul.appendChild(li);
}
function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", {payload: input.value}, showRoom); // 이벤트 이름, 페이먼트, 함수
    input.value = "";
}
form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${RoomName} (${newCount})`;
    addMessage(`${user} arrived`)
});

socket.on("bye", (left, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${RoomName} (${newCount})`;
    addMessage(`${left} left`)
 });

 socket.on("room_change", (rooms) => {
    const roomList = welcome.querySelector("ul");
    rooms.forEach(room => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    })
    addMessage(`${left} left`)
 })


 socket.on("new_message", addMessage)