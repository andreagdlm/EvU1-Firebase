const admin = require("firebase-admin");
const serviceAccount = require("./config/evaluacionu1-5a929-firebase-adminsdk-nfgo0-ea14aae7c2.json");

// Inicializa Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Inicializa Firestore

module.exports = db;
