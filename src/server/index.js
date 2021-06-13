const express = require('express');
const http = require('http');
const WebSocketServer = require('websocket').server;

const path = require('path');

const utl = require('./utilities/utility');
const connectionUtl = require('./utilities/connect-server-utl');
const {CREATE_PARTY} = require('./utilities/create-party-utl');
const {JOIN_PARTY, JOIN_PASSED} = require('./utilities/join-party-utl');
const {UPDATE_STATE} = require('./utilities/update-state-utl');
const CLOSE_CONNECTION = 4;
const {createParty, joinParty, updateMediaPlayerState, closeConnection} = require('./operations');
const {parties} = require('./partiesDB')


const PORT = process.env.PORT || 8080;


// Initialize Express app.
const app = express();
app.use(express.static(path.join(process.cwd(), 'src/client')))
app.get('/', (req, res) => res.sendFile('index.html'))

// Initialize http server using express.
const httpserver = http.createServer(app);
httpserver.listen(PORT, () => console.log(`http listening at http://localhost:${PORT}`))

// Initialize WS server.
const wsServer = new WebSocketServer({
    httpServer: httpserver
});


wsServer.on('request', request => {
    //TODO: Handle clients requests (Don't allow to any one to connect).
    const connection = request.accept(null, request.origin);

    connection.on("open", () => console.log("OPEND!!"));
    connection.on("close", (req) => {
        
    });
    
    connection.on("message", message => {
        // Message From Client.
        const req = JSON.parse(message.utf8Data)
        console.log("Request From Client !!")
        console.log(req);

        let partyId, userId, mediaPlayer;

        try{
            switch(req.methodCode){
                case CREATE_PARTY:
                    const creatingRes = createParty(req.data, connection);
                    connection.send(JSON.stringify(creatingRes));
                    break;
    
                case JOIN_PARTY:
                    partyId = req.data.partyId;
                    const joinRes = joinParty(req.data, connection);
    
                    if(joinRes.status == JOIN_PASSED && Object.keys(parties[partyId].users).length > 1){
                        notifyUsers(partyId);
                    }
                    connection.send(JSON.stringify(joinRes));
                    break;
    
                case UPDATE_STATE: // Ask to change value
                    //TODO validate user request.

                    partyId = req.data.partyId;
                    userId = req.data.userId;
                    mediaPlayer = req.data.mediaPlayer;
                    if(utl.checkUserExisting(partyId, userId)){
                        try{
                            updateMediaPlayerState(partyId, mediaPlayer);
                            // Check if there is many participants in the party to notify.
                            if(Object.keys(parties[partyId].users).length > 1){
                                notifyUsers(partyId);
                            }
                            break;
                        } catch(e){
                            console.log("ERROR", e)
                        }  
                    } 
                case CLOSE_CONNECTION:
                    partyId = req.data.partyId;
                    userId = req.data.userId;
                    if(partyId != null){
                        closeConnection(partyId, userId)
                    }
            }
        } catch(e){
            console.log(e)
            connection.send(JSON.stringify(e));
        }
        
    });
    // Send to client that the connection is opened !
    connection.send(JSON.stringify(connectionUtl.passedServerConnection()));
});


const notifyUsers = (partyId) => {
    for(const userId in parties[partyId].users){
        const res = {
            methodCode : UPDATE_STATE,
            users: Object.keys(parties[partyId].users),
            mediaPlayer: parties[partyId].mediaPlayer,
        }
        parties[partyId].users[userId].connection.send(JSON.stringify(res));
    }
    
}