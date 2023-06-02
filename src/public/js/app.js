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
    form.addEventListener("submit", handleMessageSubmit);
}


function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("input");
    const value = input.value;
    socket.emit("new_message", input.value, () => {
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

socket.on("welcome", () => {
   addMessage("someone joind!!")
});

socket.on("bye", () => {
    addMessage("someone left!!")
 })

 socket.on("new_message", addMessage)