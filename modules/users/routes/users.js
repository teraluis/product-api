const express = require('express');
const app = express();

const UsersController = require('../controllers/UserController');

const UserValidation =  require('../../../helpers/userValidate');

const validateJWT = require('../../../helpers/validateJWT');

const Role = require('../../../helpers/roleValidation');

const Mail = require('../../../helpers/mailValidation');

const { check } = require('express-validator');


const {validateFields} = require('../../../middlewares/validFields');

app.get('/user/:id',validateJWT.validateToken,
    [
        check('id','invalid id').isMongoId(),
        check('id').custom( (id) => UserValidation.exits(id)),
        validateFields
    ],
    UsersController.getById);

app.get('/user',validateJWT.validateToken, UsersController.getAllUsers);

app.post('/user',
    validateJWT.validateToken,
    [
        check('email', 'must be mail').isEmail(),
        check('role').custom((r) => Role.isValidRole(r)),
        check('email').custom((m) => Mail.unique(m)),
        validateFields
    ],
    UsersController.addUser);

app.put('/user/:id',
    validateJWT.validateToken,
    [
        check('id','invalid id').isMongoId(),
        check('id').custom( (id) => UserValidation.exits(id)),
        check('role').custom((r) => Role.isValidRole(r)),
        validateFields
    ],
    UsersController.updateUser);

app.delete('/user/:id',
    validateJWT.validateToken,
    [
        check('id','invalid id').isMongoId(),
        check('id').custom( (id) => UserValidation.exits(id)),
        validateFields
    ],
    UsersController.deleteUser);

// app.post('/sums', UsersController.twoSumm);

module.exports = app;
