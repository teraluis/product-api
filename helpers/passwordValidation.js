const passwordSize = 8;
const bcrypt = require('bcrypt');
const salt = 1;

const passwordValidation = (req, res, next) => {
    if(!req.body.password) {
        return res.status(401).json({
            msg: 'password id obligatory'
        })
    } else if(req.body.password.length < passwordSize) {
        return res.status(401).json({
            msg: `password lengt > ${passwordSize} please`
        })
    } else {
        next();
    }
};

const cryptPassword = (password = '') => {
    return bcrypt.hashSync(password, salt);
};

module.exports = {passwordValidation, cryptPassword}
