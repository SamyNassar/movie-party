
//hashmap.
const parties = {};

const addParty = (id) => {

    const newParty = {
        id,
        numOfPartecipants: 0,
        users: {},
        media:{
            name: null,
            size: null,
            type: null,
            duration: null
        },
        mediaPlayer: {
            status: 'pause',
            currentTime : 0,
            playbackRate: 1
        },
    }
    parties[newParty.id] = newParty;
}

const deleteParty = (id) => {
    delete parties.id;
}

const addClient = (partyId, user) => {
    parties[partyId].users[user.id] = {connection :user.connection};
    parties[partyId].numOfPartecipants += 1;
}

const deleteClient = (partyId, userId) => {
    delete parties[partyId].users[userId];
}

const addMedia = (partyId, media) => {
    parties[partyId].media = media;
}

const getMediaPlayerState = (partyId) => {
    return parties[partyId].mediaPlayer;
}

const setMediaPlayerState = (partyId, UpdatedMediaPlayer) => {
    parties[partyId].mediaPlayer = UpdatedMediaPlayer;
}



const logParties = () => {
    for(const party in parties){
        console.log(parties[party]);
    }
}



module.exports = {
    parties,
    addParty,
    deleteParty,
    addClient,
    deleteClient,
    addMedia,
    getMediaPlayerState,
    setMediaPlayerState,
    logParties
}