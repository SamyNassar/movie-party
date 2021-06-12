const {validate: uuidValidate} = require('uuid');
const {CREATE_PARTY} = require('./create-party-utl');
const {parties} = require('../partiesDB');
const { JOIN_PARTY } = require('./join-party-utl');
const utl = require('./utility')


// Validate the Creation request from the user.
const validateCreationRequest = (req) => {

    const res = {
        isValid: false,
        result: null
    }

    if(uuidValidate(req.userId)){
        if(typeof req.media.name === 'string'){
            res.isValid = true;
            res.result = "Valid Creation Request."
        } else{
            res.result = "Invalid Media."
        }
    } else {
        res.result = "Invalid Client ID."
    }

    return res

}

// Validate the Joining request from the user.
const validateJoiningRequest = (req) => {

    const res = {
        isValid: false,
        result: "Invalid Joinig Request."
    }

    if(validateMediaInput(req.media, JOIN_PARTY, req.partyId)){
        res.isValid = true;
        res.result = "Valid Joinig Request"
        return res;
    }

    return res;

}


// Validate user media input.
const validateMediaInput = (media, clientMethod, partyId='') => {
    if(media){
        if(clientMethod == CREATE_PARTY){
            if(Object.keys(media).length > 0){
                return true
            }
        }else if (clientMethod == JOIN_PARTY){
            if(utl.checkPartyExisting(partyId)){
                if(parties[partyId].media.name == media.name){
                    return true
                }
            }
        }
    }
    return false;
}

module.exports = {
    validateCreationRequest,
    validateJoiningRequest,
    validateMediaInput
}