const { retrieveSession,deleteSession, retrieveAllSessionKeys } = require('./sessionUtils.js');

let intervalId; 

function reviseSession() {
  // The functionality of reviseSession will be provided later.
  let session = {};
  session = retrieveAllSessionKeys();
  //console.log("reviseSessionService => reviseSession : session > ", session);
  if(session.length == 0 ){
    console.log("reviseSessionService => reviseSession : no running session found");
    return;
  }

  console.log("reviseSessionService => reviseSession : running sessions\n> ", session)
  for(let key in session){
    if(retrieveSession(session[key]) <= Date.now()){
       console.log("reviseSessionService => reviseSession : session expired for uid > ", session[key]);
       deleteSession(session[key]);
     }
  }
}

function startRevisingSessionService() {
  if (!intervalId) {
    console.log('reviseSessoinService => startRevisingSessionService : session service started');
    reviseSession(); // Run the function immediately
    intervalId = setInterval(reviseSession, 10000); // Run every 10 seconds
  }
}

function stopRevisingSessionService() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

module.exports = {
  startRevisingSessionService,
  stopRevisingSessionService,
};
