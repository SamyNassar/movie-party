import * as utl from "./utility.js"

const inputMedia = document.getElementById("media-path");
const mediaPlayer = document.getElementById("myVideo");
const createButton = document.getElementById("create-party");
const joinButton = document.getElementById("join-party");
const partyCode = document.getElementById("party-code");


const HOST = location.origin.replace(/^http/, 'ws')


let clientInfo = {};
let partyInfo = {}


// Listener for uploaded media.
inputMedia.addEventListener("change", handleMedia, false);
function handleMedia() {
  const media = this.files[0];
  const mediaURL = window.URL.createObjectURL(media);
  mediaPlayer.src = mediaURL;
}


const ws = new WebSocket(HOST);

// When connection opened.
ws.onopen = (event) => {
  const request = utl.connectServer
  ws.send(JSON.stringify(request));
};


// When server send a massage
ws.onmessage = (event) => {
  console.log('Message from server');
  console.log(event.data);

  const res = JSON.parse(event.data);

  switch(res.method){

    case utl.CONNECT_SERVER:
      clientInfo["clientId"] = res.clientId;
      break;

    case utl.CREATE_PARTY:
      console.log(res.method);
      partyInfo['partyId'] = res.partyId;
      break;

    case utl.JOIN_PARTY:
      console.log(res.method);
      break;

    case utl.UPDATE_DATA:
      console.log(res);
      console.log("Updated!");
      break;
  }

  console.log(clientInfo);
  console.log(partyInfo);
};

// Create Party button listener.
createButton.addEventListener("click", () => {
  const request = utl.creatationRequest;
  request.client = clientInfo;
  ws.send(JSON.stringify(request))
})


// Join Party listener.
joinButton.addEventListener("click", () => {

  const partyId = partyCode.value;
  //TODO validate the user input that return true or false.
  // utl.validatePartyCode(partyId);
  
  partyInfo['partyId'] = partyId;

  const request = utl.joinRequest;
  request.client = clientInfo;
  request.party = partyInfo;

  ws.send(JSON.stringify(request))
})


ws.onclose = (event) => {
  console.log("WebSocket is closed now.");
};