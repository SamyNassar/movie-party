const {v4: uuidv4} = require('uuid');

// Operation Constant.
const CONNECT_SERVER = 0;
const CONNECTION_PASSED = 1;
const CONNECTION_FAILED = -1;


// Client information schema.
const clientInfo = () => {
    return  {
        party: {
          id: null,
          numOfPartecipants: 0
        },
        user:{
          id: uuidv4()
        },
        media: {
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
    };
}



// Response when connecting to server PASSED.
const passedServerConnection = () => {
    return {
        methodCode: CONNECT_SERVER,
        status: CONNECTION_PASSED,
        clientInfo: clientInfo()
    }
} 

// Response when connecting to server FAILED.
const failedServerConnection = {
    methodCode: CONNECT_SERVER,
    status: CONNECTION_FAILED,
    errorMessage: "Connection Failed !!"
}

module.exports = {
    CONNECT_SERVER,
    CONNECTION_PASSED,
    CONNECTION_FAILED,
    passedServerConnection,
    failedServerConnection
}