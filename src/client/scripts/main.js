import * as utl from "./utility.js"

const inputMedia = document.getElementById("media-path");
const mediaPlayer = document.getElementById("myVideo");
const createButton = document.getElementById("create-party");
const joinButton = document.getElementById("join-party");
const codeInput = document.getElementById("code");
const partyCode = document.getElementById("party-code");


const HOST = location.origin.replace(/^http/, 'ws')


let clientInfo = {
  party:{}
};
// let partyInfo = {}


// Listener for uploaded media.
inputMedia.addEventListener("change", handleMedia, false);
function handleMedia() {
  const media = this.files[0];
  const mediaURL = window.URL.createObjectURL(media);
  mediaPlayer.src = mediaURL;
}

// TODO: Secure Websocket connection.
const ws = new WebSocket(HOST);

// When connection opened.
ws.onopen = (event) => {
  const request = utl.connectServer
  ws.send(JSON.stringify(request));
};


// When server send a massage
ws.onmessage = (event) => {
  console.log('Message from server');
  
  const res = JSON.parse(event.data);
  console.log(res);

  switch(res.method){

    case utl.CONNECT_SERVER:
      clientInfo["clientId"] = res.clientId;
      break;

    case utl.CREATE_PARTY:
      clientInfo.party['partyId'] = res.partyId;
      displayCode(res.partyId)
      break;

    case utl.JOIN_PARTY:
      if(res.status == utl.JOIN_PARTY){
        console.log("Joined");
      } else if (res.status == utl.INVALID_CODE){
        alert("Invalid Code!!")
      }
      break;

    case utl.UPDATE_DATA:
      console.log("Updated!");
      break;
  }

  console.log(clientInfo);
  // console.log(partyInfo);
};

// Create Party button listener.
createButton.addEventListener("click", () => {
  const request = utl.creatationRequest;
  request.client = clientInfo;
  ws.send(JSON.stringify(request))
})


// Join Party listener.
joinButton.addEventListener("click", () => {

  const partyId = codeInput.value;
  //TODO validate the user input that return true or false.
  // utl.validatePartyCode(partyId);
  
  clientInfo.party['partyId'] = partyId;

  const request = utl.joinRequest;
  request.client = clientInfo;
  request.party = clientInfo.party;

  ws.send(JSON.stringify(request))
})


ws.onclose = (event) => {
  console.log("WebSocket is closed now.");
};

const displayCode = (code) => {
  partyCode.innerHTML = `${code}`;                   // Insert text
}