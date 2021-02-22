const jwt = require('jsonwebtoken');
const User = require('../modules/users/models/usuario');

const validateToken = async (req, res = response, next) => {
    const token =  req.header('x-token');
    if(!token) {
        return res.status(401).json({
            msg: 'their is no token'
        });
    }
    try {
        const {uuid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uuid);
        if(!user) {
            return res.status(401).json({
                msg: 'user does not exists'
            })
        }
        if(!user.state) {
            return res.status(401).json({
                msg: 'user was desactivated'
            })
        }
        req.user = user;
        next();
    }catch (e) {
        res.status(401).json({
            msg: 'not valid token'
        })
    }
};

module.exports = {validateToken};
