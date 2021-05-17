
//hashmap.
let parties = {};

const addParty = (id, ) => {

    const newParty = {
        id,
        clients: {},
        media:{
            name:'Movie',
            size:'1 Gb',
            duration: '2 hours'
        },
        mediaPlayer:{
            status: 'pause',
            instant: '00:00:00',
            speed: 'normal'
        },
        test:0 // For testing
    }
    parties[newParty.id] = newParty;
}

const addClient = (partyId, client) => {
    parties[partyId].clients[client.clientId] = client;
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
    logParties
}