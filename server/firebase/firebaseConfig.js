
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const config = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });


module.exports = config;