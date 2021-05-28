const {createParty} = require('../src/server/operations');
const {CREATE_PARTY, creationResponse, creationPartyFailed} = require('../src/server/utility');



const connection = {}
const validRequest = {
    method: CREATE_PARTY,
    client: {
        media:{
            name: '',
            size: 1,
            type:'',
            duration: 1
        }
    }
}
const invalidRequest = {
    method: CREATE_PARTY,
    client: {
        media:{
            name: '',
            size: 1,
            type:'',
            duration: 1
        }
    }
}



test('Valid request', () => {

    const partyId = 'JustForTesting';

    const expectedResponse = creationResponse();
    expectedResponse.partyId = partyId;

    const result = createParty(validRequest, connection);
    result.partyId = partyId;

    expect(result).toEqual(expectedResponse);
})

test('Invalid media object request', () => {

    const req = invalidRequest;
    req.client.media = null;
    const result = createParty(req, connection);
    expect(result).toEqual(creationPartyFailed);
})
test('Invalid user object request', () => {

    const req = invalidRequest;
    req.client = null;
    const result = createParty(req, connection);
    expect(result).toEqual(creationPartyFailed);
})
test('Empty user object request', () => {

    const req = invalidRequest;
    req.client = {};
    console.log(req)
    const result = createParty(req, connection);
    expect(result).toEqual(creationPartyFailed);
})
test('Empty media object request', () => {

    const req = invalidRequest;
    req.client.media = {};
    const result = createParty(req, connection);
    expect(result).toEqual(creationPartyFailed);
})