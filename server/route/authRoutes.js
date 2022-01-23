const express = require('express');
const { registerController, loginController, privateController } = require('../controllers/auth.controller');
const { validateToken } = require('../middleware/validateToken');
const route = express.Router();


route.post('/register',registerController);
route.post('/login',loginController);

route.get('/private',validateToken,privateController);



module.exports = route;
