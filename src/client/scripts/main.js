
const inputMedia = document.getElementById("media-path");
const mediaPlayer = document.getElementById("myVideo");
const createButton = document.getElementById("create-party");
const joinButton = document.getElementById("join-party");
const partyCode = document.getElementById("party-code");


// const URL = 'https://movparty.herokuapp.com/';
const HOST = location.origin.replace(/^http/, 'ws')



inputMedia.addEventListener("change", handleMedia, false);
function handleMedia() {
  const media = this.files[0];
  const mediaURL = window.URL.createObjectURL(media);
  mediaPlayer.src = mediaURL;
}


// Create Party listener.
createButton.addEventListener("click", () => {
  console.log("Create Party!!");

  //  ws://localhost:9091
  const ws = new WebSocket(HOST);

  // Connection opened
  ws.addEventListener('open', function (event) {
    ws.send(JSON.stringify({req:'Hello Server, Please create my party!'}));
  });

  ws.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
  });

})

// Join Party listener.
joinButton.addEventListener("click", () => {
  console.log("Join Party!!");
  console.log(partyCode.value);

})




// // Connection opened
// ws.addEventListener('open', function (event) {
//     ws.send('Hello Server!');
// });

// // Listen for messages
// ws.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

// ws.onmessage = message => {
//     console.log('Message from server ', message);
// }