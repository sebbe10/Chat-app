const socket = io({ autoConnect: false });

let sendToTheRoom = document.querySelector(".sendToTheRoom");
let theList = document.querySelector(".theList");
let theListRoom = document.querySelector(".theListRoom");

let clickRoom;

// console.log(theListRoom);
socket.connect();

// if (window.location.href.includes("chat")) {
//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   username = urlParams.get("username");
//   room = urlParams.get("room");
//   socket.emit("join_room", `${room}`);
// }

let sendInTheRoom = () => {
  // socket.connect();
  let writeName = document.querySelector(".writeName").value;

  let room = document.querySelector(".writeRoom").value;

  localStorage.setItem("saveroom", JSON.stringify(room));
  console.log(writeName);
  console.log(room);

  socket.emit("user_connect", () => {
    let li = document.createElement("li");
    li.innerText = writeName + " join the chat!";
    theList.appendChild(li);
  });

  socket.on("a_user_has_connect", (username) => {
    username;
    // let li = document.createElement("li");
    // li.innerText = username + " join the chat!";
    // theList.appendChild(li);
  });

  socket.emit("message", () => {
    let theLi = document.createElement("li");
    theLi.innerText = room;
    theListRoom.appendChild(theLi);

    function addEventListenerToLiItems() {
      let writeName = document.querySelector(".writeName").value;
      let room = document.querySelector(".writeRoom").value;

      const ulElement = document.querySelector(".theListRoom");
      if (ulElement) {
        const liItems = ulElement.querySelectorAll("li");
        liItems.forEach((li) => {
          li.addEventListener("click", function () {
            console.log(`Clicked on ${li.textContent}`);
            clickRoom = li.textContent;
            li =
              location.href = `/chat.html?username=${writeName}&room=${room}`;
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

socket.on("output-message", (message) => {
  console.log(message);

  let li = document.createElement("li");
  li.innerText = `${message.username} skrev: ${message.message}`;
  outputMessage.appendChild(li);
});

if (window.location.href.includes("chat")) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  username = urlParams.get("username");
  room = urlParams.get("room");
  socket.emit("join_room", `${room}`);
}

let send = () => {
  let inputChat = document.querySelector(".inputChat").value;
  // let username = document.querySelector(".writeName").value;

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  username = urlParams.get("username");
  room = urlParams.get("room");

  socket.emit("output-message", {
    username: username,
    message: inputChat,
    room: room,
  });
  document.querySelector(
    ".output-message"
  ).innerHTML = `${username} skrev: ${inputChat}`;
};
sendMessage.addEventListener("click", send);

let leave = document.querySelector(".leave");
leave.addEventListener("click", () => {
  socket.emit("leave", clickRoom);
});
