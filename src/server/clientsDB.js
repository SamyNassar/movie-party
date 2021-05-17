

let clients = [];

const addClient = (newClient) => {
    clients.push(newClient);
}

const logClients = () => {
    for(const client in clients){
        console.log(client);
    }
}



module.exports = {
    addClient,
    logClients
}