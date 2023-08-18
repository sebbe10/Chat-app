const socket = io({ autoConnect: false });

let sendToTheRoom = document.querySelector(".sendToTheRoom");
let theList = document.querySelector(".theList");
let theListRoom = document.querySelector(".theListRoom");

let clickRoom;

console.log(theListRoom);

let sendInTheRoom = () => {
  socket.connect();
  let writeName = document.querySelector(".writeName").value;

  let room = document.querySelector(".writeRoom").value;

  console.log(writeName);
  console.log(room);

  socket.emit("user_connect", writeName);

  socket.emit("join_room", `${room}`);

  socket.on("a_user_has_connect", (username) => {
    let li = document.createElement("li");
    li.innerText = username + " join the chat!";
    theList.appendChild(li);
  });

  socket.emit("message", () => {
    let theLi = document.createElement("li");
    theLi.innerText = room;
    theListRoom.appendChild(theLi);

    function addEventListenerToLiItems() {
      const ulElement = document.querySelector(".theListRoom");
      if (ulElement) {
        const liItems = ulElement.querySelectorAll("li");
        liItems.forEach((li) => {
          li.addEventListener("click", function () {
            console.log(`Clicked on ${li.textContent}`);
            clickRoom = li.textContent;
          });
        });
      }
    }
    addEventListenerToLiItems();
  });
};

sendToTheRoom.addEventListener("click", sendInTheRoom);

let sendMessage = document.querySelector(".sendMessage");
let outputMessage = document.querySelector(".output-message");

let send = () => {
  let inputChat = document.querySelector(".inputChat").value;

  socket.emit("output-message", { message: inputChat, room: clickRoom });

  socket.on("output-message", (message) => {
    console.log(message);
    let li = document.createElement("li");
    li.innerText = message.message;
    outputMessage.appendChild(li);
  });
};
sendMessage.addEventListener("click", send);

let leave = document.querySelector(".leave");
leave.addEventListener("click", () => {
  socket.emit("leave", clickRoom);
});
