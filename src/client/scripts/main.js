import * as utl from "./utility.js";

const createButton = document.getElementById("create-party");
const joinButton = document.getElementById("join-party");
const codeInput = document.getElementById("code");
const partyCode = document.getElementById("party-code");
const inputMedia = document.getElementById("media-path");
const mediaPlayer = document.getElementById("myVideo");

const HOST = location.origin.replace(/^http/, 'ws')


let clientInfo = {
  party: {},
  media: null
};


// TODO: Secure Websocket connection.
const ws = new WebSocket(HOST);

// When connection opened.
ws.onopen = (event) => {
  const request = utl.connectServer;
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
      if(res.status == utl.CREATE_PARTY){
        clientInfo.party['partyId'] = res.partyId;
        displayCode(res.partyId);
      } else if (res.status == utl.INVALID_MEDIA){
        alert(res.message);
      }
      
      break;

    case utl.JOIN_PARTY:
      if(res.status == utl.JOIN_PARTY){
        console.log("Joined");
      } else if (res.status == utl.INVALID_CODE){
        alert(res.message);
      }
      break;

    case utl.UPDATE_DATA:
      console.log("Updated!");
      const updatedMediaPlayer = res.mediaPlayer;
      if(res.status == 'play') mediaPlayer.play()
      if(res.status == 'pause') mediaPlayer.pause()
      if(res.status == 'seeking'){
        mediaPlayer.currentTime = updatedMediaPlayer.currentTime;
        mediaPlayer.playbackRate = updatedMediaPlayer.playbackRate;
      }
      
      break;
  }

  console.log(clientInfo);
};

// Listener for uploaded media.
inputMedia.addEventListener("change", handleMedia, false);
function handleMedia() {
  const media = this.files[0];
  const mediaURL = window.URL.createObjectURL(media);
  mediaPlayer.src = mediaURL;

  mediaPlayer.onloadedmetadata = () => {
    clientInfo.media = {
      name: media.name,
      size: media.size,
      type: media.type,
      duration: mediaPlayer.duration
    }

    console.log(clientInfo);
  }
  

}

// Create Party button listener.
createButton.addEventListener("click", () => {
  const req = utl.creatationRequest;
  console.log(clientInfo);
  req.client = clientInfo;
  ws.send(JSON.stringify(req));
})


// Join Party listener.
joinButton.addEventListener("click", () => {

  const partyId = codeInput.value;
  //TODO validate the user input that return true or false.
  // utl.validatePartyCode(partyId);
  
  clientInfo.party['partyId'] = partyId;

  const req = utl.joinRequest;
  req.client = clientInfo;
  req.party = clientInfo.party;

  ws.send(JSON.stringify(req));
})


ws.onclose = (event) => {
  console.log("WebSocket is closed now.");
};

const displayCode = (code) => {
  partyCode.innerHTML = `${code}`;
}

mediaPlayer.addEventListener('play', () =>{
  console.log('play');

  const req = utl.updateMediaPlayer;
  req.mediaPlayer.status = 'play';
  req.clientId = clientInfo.clientId;
  req.partyId = clientInfo.party.partyId;
  req.mediaPlayer.currentTime = mediaPlayer.currentTime;
  req.mediaPlayer.playbackRate = mediaPlayer.playbackRate;

  console.log(req);
  ws.send(JSON.stringify(req)); 
})
mediaPlayer.addEventListener('pause', () =>{
  console.log('pause');
  const req = utl.updateMediaPlayer;
  req.mediaPlayer.status = 'pause';
  req.clientId = clientInfo.clientId;
  req.partyId = clientInfo.party.partyId;
  req.mediaPlayer.currentTime = mediaPlayer.currentTime;
  req.mediaPlayer.playbackRate = mediaPlayer.playbackRate;
  
  console.log(req);
  ws.send(JSON.stringify(req)); 
})
mediaPlayer.addEventListener('seeking', () =>{
  console.log('seeking');
  
  const req = utl.updateMediaPlayer;
  req.mediaPlayer.status = 'seeking';
  req.clientId = clientInfo.clientId;
  req.partyId = clientInfo.party.partyId;
  req.mediaPlayer.currentTime = mediaPlayer.currentTime;
  req.mediaPlayer.playbackRate = mediaPlayer.playbackRate;
  
  console.log(req);
  ws.send(JSON.stringify(req)); 
})
