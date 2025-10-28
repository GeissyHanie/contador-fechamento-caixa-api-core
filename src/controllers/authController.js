const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../models/db');

const register = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Usuário e senha obrigatórios' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
};

const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'segredo', { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { register, login };
