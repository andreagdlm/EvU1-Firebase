const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "claveSecreta";
const JWT_EXPIRES_IN = "2d";

async function login(req, res) {
  const { username, password } = req.body;
  const user = await userModel.getUserByUsername(username);
  
  if (!user) return res.status(403).json({ code: 403, message: "Usuario no encontrado" });
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(403).json({ code: 403, message: "Contraseña incorrecta" });

  // Cambios realizados aquí
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return res.status(200).json({
    code: 200,
    message: "Inicio de sesión exitoso",
    token,
  });
}

async function register(req, res) {
  const { username, password } = req.body;
  const existingUser = await userModel.getUserByUsername(username);

  if (existingUser) return res.status(400).json({ code: 400, message: "El usuario ya existe" });

  // Cifrar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.createUser(username, hashedPassword);

  const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return res.status(201).json({
    code: 201,
    message: "Usuario registrado exitosamente",
    token,
  });
}

module.exports = { login, register, JWT_SECRET };
