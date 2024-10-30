// tests/taskRoutes.test.js

const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../index');

let token;

before(async () => {
  const res = await request(app)
    .post('/auth/login')
    .send({ username: 'testuser', password: 'testpassword' });
  token = res.body.token;
});

describe('API de Tareas', () => {
  describe('POST /tasks', () => {
    it('Debe crear una nueva tarea', async () => {
      const res = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Nueva tarea de prueba',
          description: 'Descripción de la tarea de prueba',
          completed: false,
        });
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('title', 'Nueva tarea de prueba');
      expect(res.body).to.have.property('description', 'Descripción de la tarea de prueba');
      expect(res.body).to.have.property('completed', false);
    });
  });

  describe('GET /tasks', () => {
    it('Debe obtener todas las tareas del usuario', async () => {
      const res = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('GET /tasks/:id', () => {
    it('Debe obtener una tarea específica por ID', async () => {
      const task = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Tarea específica',
          description: 'Prueba para obtener tarea por ID',
        });
      const res = await request(app)
        .get(`/tasks/${task.body.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('title', 'Tarea específica');
    });

    it('Debe devolver 404 si la tarea no se encuentra', async () => {
      const res = await request(app)
        .get('/tasks/123456789012345678901234')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property('message', 'Task not found');
    });
  });

  describe('PUT /tasks/:id', () => {
    it('Debe actualizar una tarea por ID', async () => {
      const task = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Tarea para actualizar',
          description: 'Descripción antes de la actualización',
        });
      const res = await request(app)
        .put(`/tasks/${task.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Tarea actualizada',
          description: 'Descripción actualizada',
          completed: true,
        });
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('title', 'Tarea actualizada');
      expect(res.body).to.have.property('completed', true);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('Debe eliminar una tarea por ID', async () => {
      const task = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: 'Tarea para eliminar',
          description: 'Descripción para la eliminación',
        });
      const res = await request(app)
        .delete(`/tasks/${task.body.id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Tarea eliminada exitosamente');
    });
  });
});
