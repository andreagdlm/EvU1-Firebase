const db = require('../firebase');

async function getUserByUsername(username) {
  const snapshot = await db.collection('users').where('username', '==', username).get();
  if (!snapshot.empty) {
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  }
  return null;
}

async function createUser(username, password) {
  const newUser = { username, password }; // Ya se espera que la contraseña esté cifrada
  const docRef = await db.collection('users').add(newUser);
  return { id: docRef.id, ...newUser };
}

module.exports = {
  getUserByUsername,
  createUser
};
