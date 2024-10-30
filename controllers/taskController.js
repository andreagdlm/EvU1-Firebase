const db = require('../firebase');

async function getAllTasks(userId) {
  const snapshot = await db.collection('tasks').where('userId', '==', userId).get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function createTask(title, description, userId) {
  const newTask = {
    title,
    description,
    completed: false,
    createdAt: new Date(),
    userId // Guarda el ID del usuario en la tarea
  };
  const docRef = await db.collection('tasks').add(newTask);
  return { id: docRef.id, ...newTask };
}

async function getTaskById(id, userId) {
  const taskRef = db.collection('tasks').doc(id);
  const doc = await taskRef.get();
  // Verifica que la tarea pertenezca al usuario
  if (doc.exists && doc.data().userId === userId) {
    return { id: doc.id, ...doc.data() };
  }
  return null;
}

async function updateTask(taskToUpdate) {
  const { id, ...updatedFields } = taskToUpdate;
  await db.collection('tasks').doc(id).update(updatedFields);
  return { id, ...updatedFields };
}

async function deleteTask(id) {
  await db.collection('tasks').doc(id).delete();
  return { id };
}

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
};
