const {removeSession, verifySession, getAllSessionKeys} = require('../firebase/manageRealtimeDatabase');

let intervalId; 

function reviseSession() {
  // The functionality of reviseSession will be provided later.
  //console.log("reviseSessionService => reviseSession : session > ", session);
   getAllSessionKeys().then((sessions) => {
    let sessionKeys ;
    try {
      sessionKeys = Object.keys(sessions);
    } catch (error) {
    //  console.log("reviseSessionService => reviseSession : no running session found");
      return;
    }

  //console.log("reviseSessionService => reviseSession : running sessions > ", sessionKeys.length);

  for (let key of sessionKeys) {
    if (verifySession(key) <= Date.now()) {
      console.log("reviseSessionService => reviseSession : session expired for uid > ", key);
      deleteSession(key);
    }
  }
  });
  
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
