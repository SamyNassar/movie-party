
// CONNECTION Constant.
const CONNECT_SERVER = 0;
const CONNECTION_PASSED = 1;
const CONNECTION_FAILED = -1;

// CREATION Constant.
const CREATE_PARTY = 1;
const CREATION_PASSED = 1;
const CREATION_FAILED = -1;

// JOINING Constant.
const JOIN_PARTY = 2;
const JOIN_PASSED = 1;
const JOIN_FAILED = -1;

// UPDATING Constant.
const UPDATE_STATE = 3;
const UPDATE_STATE_PASSED = 1;
const UPDATE_STATE_FAILED = -1;

// Request to OPEN a CONNECTION with the server.
const serverConnectionRequest = {
    methodCode: CONNECT_SERVER
};

// Request to CREATE a party.
const creatationRequest = {
    methodCode: CREATE_PARTY,
    data : {
        userId: null,
        media: null
    }
};

// Request to JOIN a party.
const joinRequest = {
    methodCode: JOIN_PARTY,
    data: {
        userId: null,
        partyId: null,
        media: null
    }
};

// Request to UPDATE mediaplayer.
const updateStateRequest = {
    methodCode: UPDATE_STATE,
    data: {
        userId: null,
        partyId : null,
        mediaPlayer:{
            status: null,
            currentTime : null,
            playbackRate: null
        }
    }
}

export {
    CONNECT_SERVER,
    CONNECTION_PASSED,
    CONNECTION_FAILED,
    CREATE_PARTY,
    CREATION_PASSED,
    CREATION_FAILED,
    JOIN_PARTY,
    JOIN_PASSED,
    JOIN_FAILED,
    UPDATE_STATE,
    UPDATE_STATE_PASSED,
    UPDATE_STATE_FAILED,
    serverConnectionRequest,
    creatationRequest,
    joinRequest,
    updateStateRequest
}