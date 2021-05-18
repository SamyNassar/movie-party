const {v4: uuidv4, validate: uuidValidate} = require('uuid');
const {parties} = require('./partiesDB')


// Operation Constant.
const CONNECT_SERVER = 0;
const CREATE_PARTY = 1;
const JOIN_PARTY = 2;
const UPDATE_DATA = 3;
const INVALID_CODE = -1;


// Response send to clients who want to OPEN a CONNECTION with server.
const connectServer = () => {
    const data = {
        status: CONNECT_SERVER,
        method: CONNECT_SERVER,
        clientId: uuidv4()
    };

    return data;
}

// Response send to clients who want to CREATE a party.
const creatationResponse = () => {
    const data = {
        status: CREATE_PARTY,
        method: CREATE_PARTY,
        partyId: uuidv4()
    };
    return data;
}

// Response send to clients who want to JOIN a party.
const joinResponse = {
    status: JOIN_PARTY,
    method: JOIN_PARTY,
}

// Validate input code party.
const validatePartyCode = (partyCode) => {
    if(partyCode !== ""){   // Code is not empty.
        if(uuidValidate(partyCode)){    // Code is UUID.
            if(partyCode in parties){   // Code exists in parties.
                return true
            }
        }
    }
    return false
}



module.exports = {
    CONNECT_SERVER,
    CREATE_PARTY,
    JOIN_PARTY,
    UPDATE_DATA,
    INVALID_CODE,
    connectServer,
    creatationResponse,
    joinResponse,
    validatePartyCode
}


