const {validatePartyCode} = require('../src/server/utility');
const partiesDB = require('../src/server/partiesDB');
const {v4: uuidv4} = require('uuid');


test('UUID should retrn True', () => {
    const partyId = uuidv4();
    partiesDB.addParty(partyId);
    expect(validatePartyCode(partyId)).toBeTruthy()
})

test('Empty string should retrn false', () => {
    expect(validatePartyCode('')).toBeFalsy()
})

test('Null should retrn false', () => {
    expect(validatePartyCode(null)).toBeFalsy()
})

test('Random string should retrn false', () => {
    expect(validatePartyCode('not a UUID')).toBeFalsy()
})

test('fake UUID should retrn false', () => {
    expect(validatePartyCode('6ec0sd7f-11t0-d3ra-975e-2a8ae9ebse0b')).toBeFalsy()
})

