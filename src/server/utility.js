const { v4: uuidv4 } = require('uuid');



// Operation Constant.
const CONNECT = 0;
const CREATE_PARTY = 1;
const JOIN_PARTY = 2;


const connect = () => {

    const data = {
        "status":"Connect",
        "method": CONNECT,
        "clientId": uuidv4()
    };

    return data;
}


const create = () => {

    const data = {
        status:"Create",
        method: CREATE_PARTY,
        partyId: uuidv4()
    };

    return data;
}

const join = {
    status:"Join",
    method: JOIN_PARTY,
}



module.exports = {
    CONNECT,
    CREATE_PARTY,
    JOIN_PARTY,
    connect,
    create,
    join,
}


