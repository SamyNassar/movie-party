import * as utl from "./utility.js";

const createButton = document.getElementById("create-party");
const joinButton = document.getElementById("join-party");
const codeInput = document.getElementById("code");
const partyCode = document.getElementById("party-code");
const inputMedia = document.getElementById("media-path");
const mediaPlayer = document.getElementById("myVideo");

const HOST = location.origin.replace(/^http/, 'ws')


let clientInfo = null;


// TODO: Secure Websocket connection.
const ws = new WebSocket(HOST);

// When connection opened.
ws.onopen = (event) => {
  const request = utl.serverConnectionRequest;
  ws.send(JSON.stringify(request));
};


// When server send a massage.
ws.onmessage = (event) => {
  const res = JSON.parse(event.data);
  console.log("Message from Server",res);

  switch(res.methodCode){

    case utl.CONNECT_SERVER:
      clientInfo = res.clientInfo;
      break;
    case utl.CREATE_PARTY:
      if(res.status == utl.CREATION_PASSED){
        clientInfo.party.id = res.partyId;
        displayCode(res.partyId);
      } else if (res.status == utl.CREATION_FAILED){
        alert(res.errorMessage);
      }
      
      break;
    case utl.JOIN_PARTY:
      if(res.status == utl.JOIN_PASSED){
        console.log("Joined");
      } else if (res.status == utl.JOIN_FAILED){
        alert(res.errorMessage);
      }
      break;
    case utl.UPDATE_STATE:
      console.log("State is Updated.");

      updateClientState(res.mediaPlayer.status, res.mediaPlayer)
      
      updateMediaPlayerState(res.mediaPlayer)
      console.log("Client Media Player: ", clientInfo.mediaPlayer)
      break;
  
  }

  // console.log("Client info :", clientInfo);
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

    console.log("Client info :", clientInfo);
  }
  

}

// Create Party button listener.
createButton.addEventListener("click", () => {
  const req = utl.creatationRequest;
  // clientInfo.media.name = 'For Testing!!'; //TODO: remove that after finishing
  req.data = {
    userId: clientInfo.user.id,
    media: clientInfo.media
  };
  console.log("Request to server", req);
  ws.send(JSON.stringify(req));
})


// Join Party listener.
joinButton.addEventListener("click", () => {

  const partyId = codeInput.value;
  //TODO validate the user input that return true or false.
  // utl.validatePartyCode(partyId);
  
  clientInfo.party.id = partyId;

  const req = utl.joinRequest;
  // clientInfo.media.name = 'For Testing!!'; //TODO: remove that after finishing
  req.data = {
    userId: clientInfo.user.id,
    partyId: clientInfo.party.id,
    media: clientInfo.media
  };
  console.log("Request to server", req);

  ws.send(JSON.stringify(req));
})


ws.onclose = (event) => {
  console.log("WebSocket is closed now.");
  //TODO: Remove this client from party.
};

const displayCode = (code) => {
  partyCode.innerHTML = `${code}`;
}

mediaPlayer.onplay = () => {
  console.log('play');
  // clientInfo.mediaPlayer.status = 'play';
  updateClientState('play', mediaPlayer);
  notifyServer();
}
mediaPlayer.onpause = () => {
  console.log('pause');
  // clientInfo.mediaPlayer.status = 'pause';
  updateClientState('pause', mediaPlayer);
  notifyServer();
}


mediaPlayer.onseeked = () => {
  console.log('seeked');
  updateClientState('paues', mediaPlayer);
  notifyServer();
}


const notifyServer = () => {
  if(clientInfo.party.id != null){

    const stateRequest = utl.updateStateRequest;


    stateRequest.data.userId = clientInfo.user.id;
    stateRequest.data.partyId = clientInfo.party.id;
    stateRequest.data.mediaPlayer = clientInfo.mediaPlayer;


    console.log("State Request : ", stateRequest)

    ws.send(JSON.stringify(stateRequest)); 
  }

}

const updateClientState = (event, mediaPlayer) => {

  clientInfo.mediaPlayer.status = event;
  clientInfo.mediaPlayer.currentTime = mediaPlayer.currentTime;
  clientInfo.mediaPlayer.playbackRate = mediaPlayer.playbackRate;

}

const updateMediaPlayerState = (updatedMediaPlayer) => {
  mediaPlayer.playbackRate = updatedMediaPlayer.playbackRate;

  if(Math.abs(updatedMediaPlayer.currentTime - mediaPlayer.currentTime) > 0.5){
    mediaPlayer.currentTime = updatedMediaPlayer.currentTime;
  }

  if(clientInfo.mediaPlayer.status == 'play') mediaPlayer.play();
  if(clientInfo.mediaPlayer.status == 'pause') mediaPlayer.pause();

}