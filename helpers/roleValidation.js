const Role = require('../modules/roles/models/roles');

const isValidRole = async (rol = '') => {
    const role = await Role.findOne({role: rol});
    if(!role) {
        throw new Error(`${rol} is not in DB`);
    }
};

module.exports = {isValidRole}
