const validate = require('./utilities/validate');
const utl = require('./utilities/utility');
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
        const numOfPartecipants = partiesDB.addClient(res.partyId, client);
        partiesDB.addMedia(res.partyId, data.media);
        console.log(`Num of partecipants : ${numOfPartecipants}`);

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

        const numOfPartecipants = partiesDB.addClient(data.partyId, client);
        console.log(`Num of partecipants : ${numOfPartecipants}`);
    } else{
        res = joiningUtl.failedJoinResponse;
        res.errorMessage = requestValidation.result;
    }



    return res;
}

const updateMediaPlayerState = (partyId, mediaPlayer) => {
    partiesDB.setMediaPlayerState(partyId, mediaPlayer);
}

const closeConnection = (partyId, userId) => {
    if(utl.checkPartyExisting(partyId)){
        if(utl.checkUserExisting(partyId, userId)){
            const numOfPartecipants = partiesDB.deleteClient(partyId, userId);
            console.log(`Num of partecipants : ${numOfPartecipants}`);
            if(numOfPartecipants == 0){
                partiesDB.deleteParty(partyId);
                console.log(`${partyId} Is deleted.`)
            }
        }
    }
}


module.exports = {
    createParty,
    joinParty,
    updateMediaPlayerState,
    closeConnection
}
