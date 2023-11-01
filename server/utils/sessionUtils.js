const fs = require('fs');
const path = require('path');

const sessionFilePath = path.join(__dirname, 'session.json');

function updateSession(uid, expiration) {
  
  let sessions = {};

  try {
    sessions = JSON.parse(fs.readFileSync(sessionFilePath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If the file does not exist, create an empty sessions object
      sessions = {};
      fs.writeFileSync(sessionFilePath, JSON.stringify(sessions), 'utf8');
    } else {
      // Handle other errors
      console.error("Error reading session file:", error);
    }
  }
  sessions[uid] = { expiration };
  fs.writeFileSync(sessionFilePath, JSON.stringify(sessions), 'utf8');
  console.log("sessionUtils => updateSession : session updated with uid : ", uid ," and expiration : " ,expiration);
}


function deleteSession(uid) {
  let sessions = {};

  try {
    sessions = JSON.parse(fs.readFileSync(sessionFilePath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If the file does not exist, create an empty sessions object
      sessions = {};
      fs.writeFileSync(sessionFilePath, JSON.stringify(sessions), 'utf8');
    } else {
      // Handle other errors
      console.error("Error reading session file:", error);
    }
  }
  if (sessions.hasOwnProperty(uid)) {
    delete sessions[uid];
  }
  fs.writeFileSync(sessionFilePath, JSON.stringify(sessions), 'utf8');
  console.log("sessionUtils => deleteSession : session deleted with uid : ", uid);
}

function retrieveSession(uid) {
  let sessions = {};

  try {
    sessions = JSON.parse(fs.readFileSync(sessionFilePath, 'utf8'));
  } catch (error) {
    // If the file is empty or does not exist, sessions will be an empty object
  }
  if (sessions.hasOwnProperty(uid)) {
    //console.log("sessionUtils => retrieveSession : session retrieved with uid : ", uid);
    //console.log("\t\t\t\t\t\t\t expiration : ", sessions[uid].expiration);
    return sessions[uid].expiration;
  } else {
    return null;
  }
}

// function to return all the keys from the session file

function retrieveAllSessionKeys() {
  let sessions = {};

  try {
    sessions = JSON.parse(fs.readFileSync(sessionFilePath, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') {
      // If the file does not exist, create an empty sessions object
      sessions = {};
      fs.writeFileSync(sessionFilePath, JSON.stringify(sessions), 'utf8');
    } else {
      // Handle other errors
      console.error("Error reading session file:", error);
    }
  }
  //const numberOfSessions = Object.keys(sessions).length;
 // console.log("sessionUtils => retrieveAllSessionKeys : all session keys retrieved \n\n", Object.Object.keys(sessions).length, "\n");
 //console.log("sessionUtils => retrieveAllSessionKeys : numberOfSesssions", Object.keys(sessions).length);
  return Object.keys(sessions);
} 

function verifySession(uid) {
  let sessions = {};

  try {
    sessions = JSON.parse(fs.readFileSync(sessionFilePath, 'utf8'));
  } catch (error) {
    // If the file is empty or does not exist, sessions will be an empty object
  }
  if (sessions.hasOwnProperty(uid)) {
    //console.log("sessionUtils => retrieveSession : session retrieved with uid : ", uid);
    //console.log("\t\t\t\t\t\t\t expiration : ", sessions[uid].expiration);
    return true;
  } else {
    return false;
  }
}


module.exports = { updateSession, deleteSession, retrieveSession, retrieveAllSessionKeys, verifySession };