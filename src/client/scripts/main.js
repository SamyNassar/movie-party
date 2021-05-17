
const inputMedia = document.getElementById("media-path");
const mediaPlayer = document.getElementById("myVideo");
const createButton = document.getElementById("create-party");
const joinButton = document.getElementById("join-party");
const partyCode = document.getElementById("party-code");


const HOST = location.origin.replace(/^http/, 'ws')

let clientInfo = {};
let partyInfo = {}



inputMedia.addEventListener("change", handleMedia, false);
function handleMedia() {
  const media = this.files[0];
  const mediaURL = window.URL.createObjectURL(media);
  mediaPlayer.src = mediaURL;
}


const ws = new WebSocket(HOST);

// When connection opened.
ws.addEventListener('open', function (event) {
  ws.send(JSON.stringify({method:0}));
});


// When server send a massage
ws.addEventListener('message', function (event) {
  console.log('Message from server \n', event.data);

  const res = JSON.parse(event.data);

  switch(res.method){
    case 0:
      clientInfo["clientId"] = res.clientId;
      break;
    case 1:
      console.log(res.method);
      clientInfo['partyId'] = res.partyId;
      break;
    case 2:
      console.log(res.method);
      break;
  }

  console.log(clientInfo);
});

// Create Party button listener.
createButton.addEventListener("click", () => {
  console.log("Create Party!!");  

  const request = {
    method:1,
    client : clientInfo
  }
  ws.send(JSON.stringify(request))
})



// Join Party listener.
joinButton.addEventListener("click", () => {
  console.log("Join Party!!");

  const partyId = partyCode.value;

  partyInfo['partyId'] = partyId;


  const req = {
    method:2, // Join party
    client: clientInfo,
    party : partyInfo
  }

  console.log(req);

  ws.send(JSON.stringify(req))
})