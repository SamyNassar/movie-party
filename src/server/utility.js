const { v4: uuidv4 } = require('uuid');



// Operation Constant.
const CONNECT = 0;
const CREATE_PARTY = 1;
const JOIN_PARTY = 2;


const connect = {
    method: CONNECT,
    ClientId: uuidv4()
}

const create = {
    method: CREATE_PARTY,
    partyId: uuidv4()
}

const join = {
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


