const express = require('express');
const { body } = require('express-validator');
const {validateFields} = require('../../../middlewares/validFields')
const app = express();
const LoginController = require('../controller/loginController');

app.post('/login',
     [
         body('mail', 'you must give a valid mail').isEmail(),
         body('password', 'password is mandatory').not().isEmpty(),
         validateFields
     ]
    ,LoginController.login);

module.exports = app;
