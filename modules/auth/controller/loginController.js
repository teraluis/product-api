const bcryptjs = require('bcryptjs');
const User = require('../../users/models/userModel');
const { generateJWT } = require('../../../helpers/generateJWT');
class LoginController {
    login = async (req, res) => {

        const {mail, password} = req.body;

        try {
            //mail exits
            const user = await User.findOne({email: mail});
            if (!user) {
                return res.status(400).json({
                    msg: 'User / Password is not correct or user'
                });
            }

            if (!user.state) {
                return res.status(400).json({
                    msg: 'user is deactivated'
                });
            }
            // match password
            const validPassword = bcryptjs.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: 'wrong password'
                });
            }
            // genrate jwt
            const token = await generateJWT(user._id);
            res.json({
                user,
                jwt: token
            });
        }catch (error) {
            return res.status(500).json({
               msg: 'talk with administrator'
            });
        }
    }
}

module.exports = new LoginController();
