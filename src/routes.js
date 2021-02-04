const express = require('express');

const routes = express.Router();
const User = require('./controllers/user.controller');

routes.get('/', User.consultaGeral);
routes.post('/cadastrar', User.cadastrar);
routes.post('/login', User.login);

module.exports = routes;