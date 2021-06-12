const {joinParty} = require('../src/server/operations');
const {JOIN_PARTY, joinResponse, joinPartyFailed} = require('../src/server/utilities/utility');
const partiesDB = require('../src/server/partiesDB');


const partyId = 'justForTest';
const connection = {};


test('Valid join request', () => {

    const joinRes = joinResponse;

    const req = {
        method: JOIN_PARTY,
        body: {
            client:{

            },
            party:{
                id: partyId
            }
        }
    };


    expect(joinParty(req, connection)).toEqual(joinRes);
})