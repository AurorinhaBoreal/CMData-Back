const express = require('express')
const userController = require('./controller/userController.js')

const routes = express();

routes.use('/user', userController);

module.exports = routes;