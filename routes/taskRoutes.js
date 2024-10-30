const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/authMiddleware');

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una nueva tarea
 *     description: Crea una nueva tarea para el usuario autenticado.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *                 example: "Nueva tarea"
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea
 *                 example: "Descripción de la nueva tarea"
 *               completed:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post('/', authenticateToken, async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  const newTask = await taskController.createTask(title, description, userId);
  res.status(201).json(newTask);
});

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Obtener todas las tareas del usuario
 *     description: Retorna todas las tareas pertenecientes al usuario autenticado.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas del usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       404:
 *         description: No se encontraron tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Tasks not found"
 */
router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const tasks = await taskController.getAllTasks(userId);
  if (tasks.length > 0) res.status(200).json(tasks);
  else res.status(404).json({ code: 404, message: "Tasks not found" });
});

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     description: Obtiene una tarea específica por su ID para el usuario autenticado.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarea no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Task not found"
 */
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const task = await taskController.getTaskById(id, userId);
  if (task) res.status(200).json(task);
  else res.status(404).json({ code: 404, message: 'Task not found' });
});

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea por ID
 *     description: Actualiza los detalles de una tarea específica por su ID.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la tarea
 *                 example: "Tarea actualizada"
 *               description:
 *                 type: string
 *                 description: Descripción actualizada de la tarea
 *                 example: "Descripción actualizada de la tarea"
 *               completed:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Tarea actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const updatedTaskData = { id, ...req.body };
  const taskUpdated = await taskController.updateTask(updatedTaskData);
  res.status(200).json(taskUpdated);
});

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     description: Elimina una tarea específica por su ID.
 *     tags:
 *       - Tareas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tarea eliminada exitosamente"
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const taskDeleted = await taskController.deleteTask(id);
  res.status(200).json(taskDeleted);
});

module.exports = router;
