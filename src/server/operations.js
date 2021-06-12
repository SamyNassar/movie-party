const validate = require('./utilities/validate');
const creationUtl = require('./utilities/create-party-utl');
const joiningUtl = require('./utilities/join-party-utl');
const partiesDB = require('./partiesDB');


const createParty = (data, connection) => {
 
    let res = null;
    const requestValidation = validate.validateCreationRequest(data);

    if(requestValidation.isValid) {
        res = creationUtl.passedCreationResponse();

        const client = {
            id: data.userId,
            connection: connection
        }
        
        partiesDB.addParty(res.partyId);
        partiesDB.addClient(res.partyId, client);
        partiesDB.addMedia(res.partyId, data.media);

    } else{
        res = creationUtl.failedCreationResponse;
        res.errorMessage = requestValidation.result
    }

    return res;
}


const joinParty = (data, connection) => {

    let res = null;

    const requestValidation = validate.validateJoiningRequest(data);

    if(requestValidation.isValid){
        res = joiningUtl.passedJoinResponse;
        const client = {
            id: data.userId,
            connection: connection
        }

        partiesDB.addClient(data.partyId, client);
    } else{
        res = joiningUtl.failedJoinResponse;
        res.errorMessage = requestValidation.result;
    }


    return res;
}

const updateMediaPlayerState = (partyId, mediaPlayer) => {
    partiesDB.setMediaPlayerState(partyId, mediaPlayer);
}



module.exports = {
    createParty,
    joinParty,
    updateMediaPlayerState
}
