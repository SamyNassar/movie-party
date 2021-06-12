
// Operation Constant.
const UPDATE_STATE = 3;
const UPDATE_STATE_PASSED = 1;
const UPDATE_STATE_FAILED = -1;

const updateStateRequest = {
    methodCode: UPDATE_STATE,
    userId: null,
    partyId : null,
    mediaPlayer:{
      status: null,
      currentTime : null,
      playbackRate: null
    }
}

const passedUpdateStateResponse = {
    methodCode: UPDATE_STATE,
    status: UPDATE_STATE_PASSED,
    

}

const failedUpdateStateResponse = {
    methodCode: UPDATE_STATE,
    status: UPDATE_STATE_FAILED,
    errMessage: "Update Media player Failed !!"
}

module.exports = {
    UPDATE_STATE,
    UPDATE_STATE_PASSED,
    UPDATE_STATE_FAILED,
    updateStateRequest,
    passedUpdateStateResponse,
    failedUpdateStateResponse
}