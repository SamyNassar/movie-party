
//hashmap.
let parties = {};

const addParty = (id) => {

    const newParty = {
        id,
        clients: {},
        media:{},
        mediaPlayer: {
            status: 'pause',
            currentTime : 0,
            playbackRate: 1
        },
    }
    parties[newParty.id] = newParty;
}

const addClient = (partyId, client) => {
    parties[partyId].clients[client.clientId] = client;
}

const addMedia = (partyId, media) => {
    parties[partyId].media = media;
}

const logParties = () => {
    for(const party in parties){
        console.log(parties[party]);
    }
}



module.exports = {
    parties,
    addParty,
    addClient,
    addMedia,
    logParties
}