const {validateMediaInput, CREATE_PARTY, JOIN_PARTY} = require('../src/server/utility');
const partiesDB = require('../src/server/partiesDB');
const {v4: uuidv4} = require('uuid');


const partyId = 'justForTest';

const sourceMedia = {
    name: 'media',
    size: 1561565,
    type: '',
    duration: ''
}
const validMedia ={
    name: 'media',
    size: 1561565,
    type: '',
    duration: ''
}
const invalidMedia ={
    name: 'Invalid media',
    size: 1561565,
    type: '',
    duration: ''
}

partiesDB.addParty(partyId);
partiesDB.parties[partyId].media = sourceMedia;

// When user Create a Party.
test('Valid media input should retrn True', () => {
    expect(validateMediaInput(validMedia, CREATE_PARTY, partyId)).toBeTruthy()
})


test('Identical media name that exist in DB should retrn True', () => {
    expect(validateMediaInput(validMedia, JOIN_PARTY, partyId)).toBeTruthy()
})

test('Invalid media name should retrn False', () => {
    expect(validateMediaInput(invalidMedia, JOIN_PARTY, partyId)).toBeFalsy()
})



