const express = require('express');
const http = require('http');
const WebSocketServer = require('websocket').server;

const path = require('path');

const utitliy = require('./utility')


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
        const msg = JSON.parse(message.utf8Data)
        console.log(msg);
        
        switch(msg.method){
            case CREATE_PARTY:
                // TODO : createParty() method.
                // createParty();
                console.log("CREATING A PARTY !!");
                connection.send(JSON.stringify(utitliy.CREATE_PARTY));
                break;
            case JOIN_PARTY:
                // TODO : joinParty() method.
                // joinParty();
                console.log("JOINING A PARTY !!");
                connection.send(JSON.stringify(utitliy.JOIN_PARTY));
                break;
            default:
                console.log(msg);
        }


    });


    

    connection.send(JSON.stringify(utitliy.connect));
});

// wsServer.on('connect', () => {
//     console.log("CONNECTED!!");
// })
// wsServer.on('close', () => {
//     console.log("WS CLOSED!!");
// })







