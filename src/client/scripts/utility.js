

// Operation Constant.
const CONNECT_SERVER = 0;
const CREATE_PARTY = 1;
const JOIN_PARTY = 2;
const UPDATE_DATA = 3;
const INVALID_CODE = -1;
const INVALID_MEDIA = -1


// Request to OPEN a CONNECTION with the server.
const connectServer = {
    method: CONNECT_SERVER
};

// Request to CREATE a party.
const creatationRequest = {
    method: CREATE_PARTY,
    client : null
};

// Request to JOIN a party.
const joinRequest = {
    method: JOIN_PARTY,
    client: null,
    party : null
};

const updateMediaPlayer = {
    status:"Update Media Player status",
    method: UPDATE_DATA,
    clientId: null,
    partyId : null,
    mediaPlayer:{
      status: null,
      currentTime : null,
      playbackRate: null
    }
}



export{
    CONNECT_SERVER,
    CREATE_PARTY,
    JOIN_PARTY,
    UPDATE_DATA,
    INVALID_CODE,
    INVALID_MEDIA,
    connectServer,
    creatationRequest,
    joinRequest,
    updateMediaPlayer
}