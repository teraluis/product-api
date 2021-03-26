const express = require('express');

const app = express();

const RolesController = require('../controllers/RolesController');

const { check } = require('express-validator');

const {validateFields} = require('../../../middlewares/validFields');

app.get('/roles', RolesController.getAllRoles);

module.exports = app;
