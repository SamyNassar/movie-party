const express = require('express');
const http = require('http');
const WebSocketServer = require('websocket').server;

const path = require('path');

const utitliy = require('./utility')
const partiesDB = require('./partiesDB')

// const CircularJSON = require('circular-json');

const PORT = process.env.PORT || 8080;

// Operation Constant.
const CREATE_PARTY = utitliy.CREATE_PARTY;
const JOIN_PARTY = utitliy.JOIN_PARTY;
const UPDATE_DATA = utitliy.UPDATE_DATA;


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
    console.log("Request Accepted !!")

    connection.on("open", () => console.log("OPEND!!"));
    connection.on("close", () => console.log("CONNECTION CLOSED!!"));
    
    connection.on("message", message => {
        // Message From Client.
        const req = JSON.parse(message.utf8Data)
        console.log(req);
        
        switch(req.method){
            case CREATE_PARTY:
                const creatingRes = createParty(req, connection);
                console.log("Party has been created!!");
                connection.send(JSON.stringify(creatingRes));
                break;

            case JOIN_PARTY:
                const joinRes = joinParty(req, connection);
                console.log("JOINED TO PARTY !!");

                // notifyClients();

                connection.send(JSON.stringify(joinRes));
                break;
            case UPDATE_DATA: // Ask to change value
                partiesDB.parties[req.party.partyId].test = req.test;
        }
    });
    // Send to client that the connection is opened !
    connection.send(JSON.stringify(utitliy.connectServer()));
});


const createParty = (req, connection) => {

    const res = utitliy.creatationResponse();
    req.client['connection'] = connection;
    
    partiesDB.addParty(res.partyId, connection);
    partiesDB.addClient(res.partyId, req.client);

    return res;
}


const joinParty = (req, connection) => {

    const res = utitliy.joinResponse;

    if(!utitliy.validatePartyCode(req.party.partyId)){
        res.status = utitliy.INVALID_CODE;
        res.message = "Invalid Code";

        return res;
    }

    req.client['connection'] = connection;
    partiesDB.addClient(req.party.partyId ,req.client);

    return res;

}


const notifyClients = () => {

    for(const party in partiesDB.parties){
        for(const client in partiesDB.parties[party].clients){
            console.log(partiesDB.parties[party])

            // const updatedParty = JSON.parse(CircularJSON.stringify(partiesDB.parties[party]))
            const updatedParty = partiesDB.parties[party]
            
            const res = {
                method : UPDATE_DATA,
                // clients: updatedParty.clients,
                mediaPlayer: updatedParty.mediaPlayer,
            }
            partiesDB.parties[party].clients[client].connection.send(JSON.stringify(res))
        }
    }
    setTimeout(notifyClients, 500)
}