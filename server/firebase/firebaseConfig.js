
const admin = require('firebase-admin');
const serviceAccount = process.env.SERVICE_ACCOUNT;

const config = admin.initializeApp({ credential: admin.credential.cert(serviceAccount), databaseURL: 'https://tripwiz-r-default-rtdb.firebaseio.com/' });
const realtimeDB = admin.database();

module.exports = {
    admin,
    realtimeDB,
  };