const Role = require('../modules/roles/models/roles');

const isValidRole = async (rol = '') => {
    const role = await Role.findOne({role: rol});
    if(!role) {
        throw new Error(`${rol} is not in DB`);
    }
};

const isAdmin = async (req, res, next) => {
    const {role, name} = req.user;
    if(!req.user) {
        return res.status(500).json({msg: 'check token first before role'});
    }
    if(role !== "ADMIN_ROLE") {
        return res.status(401).json({msg: `${name} is not administrator`});
    }
    next();
};

const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({msg: 'validate token first'});
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({msg: 'the service requires specific role'});
        }
        next();
    }
};

module.exports = {isValidRole, isAdmin, hasRole};
