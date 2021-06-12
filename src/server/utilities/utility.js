const {parties} = require('../partiesDB');




// Check party existing in Database.
const checkPartyExisting = (id) => {
    if(id in parties) {
        return true;
    }
    return false;

}

// Check user existing in Database.
const checkUserExisting = (partyId, userId) => {
    if(checkPartyExisting(partyId)){
        if(userId in parties[partyId].users){
            return true;
        }
    }
    return false;
}







module.exports = {
    checkPartyExisting,
    checkUserExisting,
}


