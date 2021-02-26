const express = require('express');
const app = express();

const productController = require('../products/controllers');

const validateJWT = require('../../../helpers/validateJWT');

const Role = require('../../../helpers/roleValidation');

const Mail = require('../../../helpers/mailValidation');

const { check } = require('express-validator');


const {validateFields} = require('../../../middlewares/validFields');

app.get('/product/:id', validateJWT.validateToken, productController.getById);
