
const inputMedia = document.getElementById("media-path");
const mediaPlayer = document.getElementById("myVideo");
const createButton = document.getElementById("create-party");
const joinButton = document.getElementById("join-party");
const partyCode = document.getElementById("party-code");


const HOST = location.origin.replace(/^http/, 'ws')

let ClientInfo;



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
    console.log('Message from server \n', event.data);
    
    const res = JSON.parse(event.data);
    console.log(res);

    switch(res.method){
      case 0:
        console.log(res.method);
        break;
      case 1:
        console.log(res.method);
        break;
      case 2:
        console.log(res.method);
        break;
    }


    

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