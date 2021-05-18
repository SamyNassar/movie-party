const { v4: uuidv4 } = require('uuid');


// Operation Constant.
const CONNECT_SERVER = 0;
const CREATE_PARTY = 1;
const JOIN_PARTY = 2;

// Response send to clients who want to OPEN a CONNECTION with server.
const connectServer = () => {
    const data = {
        status:"Connect",
        method: CONNECT_SERVER,
        clientId: uuidv4()
    };

    return data;
}

// Response send to clients who want to CREATE a party.
const createParty = () => {
    const data = {
        status:"Create",
        method: CREATE_PARTY,
        partyId: uuidv4()
    };
    return data;
}

// Response send to clients who want to JOIN a party.
const joinResponse = {
    status:"Join",
    method: JOIN_PARTY,
}



module.exports = {
    CONNECT: CONNECT_SERVER,
    CREATE_PARTY,
    JOIN_PARTY,
    connectServer,
    createParty,
    joinResponse,
}


