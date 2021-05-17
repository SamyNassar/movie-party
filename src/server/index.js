const express = require('express');
const http = require('http');
const WebSocketServer = require('websocket').server;

const path = require('path');

const utitliy = require('./utility')
const partiesDB = require('./partiesDB')

const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 8080;


// Operation Constant.
const CONNECT = utitliy.CONNECT;
const CREATE_PARTY = utitliy.CREATE_PARTY;
const JOIN_PARTY = utitliy.JOIN_PARTY;


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
    const connection = request.accept(null, request.origin);
    console.log("Request Accepted !!")
    // console.log(connection)

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
                connection.send(JSON.stringify(joinRes));
                break;
        }
    });

    // Send to client that the connection is opened !
    connection.send(JSON.stringify(utitliy.connect()));
});


const createParty = (req, connection) => {

    const res = utitliy.create();
    req.client['connection'] = connection;
    
    partiesDB.addParty(res.partyId, connection);
    partiesDB.addClient(res.partyId, req.client);

    // For testing
    partiesDB.parties[res.partyId].test = 0;

    // partiesDB.logParties();
    return res;
}

const joinParty = (req, connection) => {

    const res = utitliy.join;

    console.log(req)
    req.client['connection'] = connection;

    partiesDB.addClient(req.party.partyId ,req.client);
    // partiesDB.logParties();
    return res;

}


