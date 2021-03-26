const Role = require('../models/roles');

class RolesController {

    getAllRoles = async (req, res) => {
        const roles = await Role.find();
        return res.json(roles.map(r => r.role));
    };

}

module.exports  = new RolesController();
