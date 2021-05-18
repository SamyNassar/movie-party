

// Operation Constant.
const CONNECT_SERVER = 0;
const CREATE_PARTY = 1;
const JOIN_PARTY = 2;
const UPDATE_DATA = 3;


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



export{
    CONNECT_SERVER,
    CREATE_PARTY,
    JOIN_PARTY,
    UPDATE_DATA,
    connectServer,
    creatationRequest,
    joinRequest
}