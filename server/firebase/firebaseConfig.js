
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

const config = admin.initializeApp({ credential: admin.credential.cert(serviceAccount), databaseURL: 'https://tripwiz-r-default-rtdb.firebaseio.com/' });
const realtimeDB = admin.database();

module.exports = {
    admin,
    realtimeDB,
  };