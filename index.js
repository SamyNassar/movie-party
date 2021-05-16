const express = require('express');
const path = require('path');
const WebSocketServer = require('websocket').server;
const http = require('http');


const PORT = process.env.PORT || 8080;

// Operation Constant.
const CONNECT = 0;
const CREATE_PARTY = 1;
const JOIN_PARTY = 2;


// Initialize Express app.
const app = express();
app.use(express.static(path.join(__dirname, 'src/client')))
app.get('/', (req, res) => res.sendFile('index.html'))
// app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))




const httpserver = http.createServer(app);
httpserver.listen(PORT, () => console.log(`http listening at http://localhost:${PORT}`))


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
                connection.send(JSON.stringify({status: "CREATE"}));
                break;
            case JOIN_PARTY:
                // TODO : joinParty() method.
                // joinParty();
                console.log("JOINING A PARTY !!");
                connection.send(JSON.stringify({status: "JOIN"}));
                break;
            default:
                console.log(msg);
        }


    });


    const res = {
        method: CONNECT,
        clientId : 1512315, // TODO <guid>
    }

    connection.send(JSON.stringify(res));
});

// wsServer.on('connect', () => {
//     console.log("CONNECTED!!");
// })
// wsServer.on('close', () => {
//     console.log("WS CLOSED!!");
// })


  



