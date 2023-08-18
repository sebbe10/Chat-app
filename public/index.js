const socket = io({ autoConnect: false });

let sendToTheRoom = document.querySelector(".sendToTheRoom");
let theList = document.querySelector(".theList");
let theListRoom = document.querySelector(".theListRoom");

let sendInTheRoom = () => {
  socket.connect();
  let writeName = document.querySelector(".writeName").value;

  let room = document.querySelector(".writeRoom").value;

  console.log(writeName);
  console.log(room);

  socket.emit("user_connect", writeName);

  socket.emit("join_room", "rum");

  socket.on("a_user_has_connect", (username) => {
    let li = document.createElement("li");
    li.innerText = username + " join the chat!";
    theList.appendChild(li);
  });

  socket.emit("message", () => {
    let theLi = document.createElement("li");
    theLi.innerText = room;
    theListRoom.appendChild(theLi);
  });
};

sendToTheRoom.addEventListener("click", sendInTheRoom);

let sendMessage = document.querySelector(".sendMessage");
let outputMessage = document.querySelector(".output-message");

let send = () => {
  let inputChat = document.querySelector(".inputChat").value;

  // socket.on("message", (msg) => {
  //   let li = document.createElement("li");
  //   li.innerText = msg + " join the room!";
  //   theList.appendChild(li);
  // });

  socket.on("meesage");

  console.log(inputChat);
};

sendMessage.addEventListener("click", send);

// let leave = document.querySelector(".leave");
// leave.addEventListener("click", () => {
//   socket.emit("leave", "rum");
// });

let leave = document.querySelector(".leave");
leave.addEventListener("click", () => {
  socket.emit("leave", "rum");
});
