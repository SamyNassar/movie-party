
// Operation Constant.
const JOIN_PARTY = 2;
const JOIN_PASSED = 1;
const JOIN_FAILED = -1;


// Response send to clients when JOIN a party PASSED.
const passedJoinResponse = {
    methodCode: JOIN_PARTY,
    status: JOIN_PASSED  
}

// Response send to clients when JOIN a party FAILED.
const failedJoinResponse = {
    methodCode: JOIN_PARTY,
    status: JOIN_FAILED,
    errorMessage: "Join party failed"    // Should show the err.
}

module.exports = {
    JOIN_PARTY,
    JOIN_PASSED,
    JOIN_FAILED,
    passedJoinResponse,
    failedJoinResponse,
}