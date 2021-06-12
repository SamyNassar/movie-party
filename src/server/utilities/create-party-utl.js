const {v4: uuidv4} = require('uuid');
const utl = require('./utility')

// Operation Constant.
const CREATE_PARTY = 1;
const CREATION_PASSED = 1;
const CREATION_FAILED = -1;


// Response send to clients when CREATE a party PASSED.
const passedCreationResponse = () => {
    return  {
        methodCode: CREATE_PARTY,
        status: CREATION_PASSED,
        partyId: createPartyId()
    }
}

const createPartyId = () => {
    let partyId = uuidv4();
    let isPartyExist = utl.checkPartyExisting(partyId);
    while(isPartyExist){
        partyId = uuidv4();
        isPartyExist = utl.checkPartyExisting(partyId);
    }
    return partyId;
}

// Response send to clients when CREATE a party FAILED.
const failedCreationResponse = {
    methodCode: CREATE_PARTY,
    status: CREATION_FAILED,
    errorMessage: "Creation party failed"    // Should show the err.
}


module.exports = {
    CREATE_PARTY,
    passedCreationResponse,
    failedCreationResponse
}