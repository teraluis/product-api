const User = require('../models/usuario');
const Password =  require('../../../helpers/passwordValidation');

const _ = require('underscore');

class UserController {

    getById =  async (req, res) => {
        const {id} = req.params;
        const user = await User.find({_id: id, state: true}).exec();
        return res.json({user});
     };

     getAllUsers = async (req, res) => {
         const {from = 0, limit = 5} = req.query
         const [count, users] = await Promise.all([
             User.countDocuments({state: true}),
             User.find({state: true}, 'name email role').skip(Number(from))
                 .limit(Number(limit))
                 .exec({state: true})
         ]);
         return res.json({count, users});
    };

    addUser = async (req, res) => {
        const {name, email, password, role, state} = req.body;
        const user = new User({name, email, password, role, state});
        user.password = Password.cryptPassword(password);
        await user.save();
        return res.json({user});
    };

    updateUser = async (req, res) => {
        const {id} = req.params;
        const {_id, password, ...user} = req.body;
        if(password) {
            user.password = Password.cryptPassword(password);
        }
        const userUpdate = await User.findByIdAndUpdate(id,user, {new: true});
        return res.json({user: userUpdate});
    };

    deleteUser = async (req, res) => {
        const body = { state: false };
        const user = await User.findByIdAndUpdate(req.params.id, body, {new: true});
        return res.json({msg: `${user.name} was removed` })
    };

    removeUser = async (req, res) => {
        const {id} = req.params;
        const user = await User.findByIdAndRemove(id);
        return res.json({user});
    };
    anonymiseUser = async (req, res) => {
        const anonymusMail = Password.cryptPassword(req.body.email)+'@anonym.com';
        const body = { state: false, name: '-', email: anonymusMail};
        const user = await User.findByIdAndUpdate(req.params.id, body, {new: true});
        return res.json({msg: `${user.name} was removed` })
    }

    twoSumm = (req, res) => {
         const {nums, target} = req.body;
         let somme = 0;
         let indices = [];
         let found = false;
         for(let i = 0; i < nums.length - 1; i++) {
             if(!found) {
                 somme = nums[i];
                 indices = [i];
                 for(let j = i+1; j < nums.length; j++) {
                     if(!found) {
                         somme += nums[j];
                         console.log(`somme === target : ${somme}  ===   ${target}`);
                         indices.push(j);
                         if(somme === target) {
                             found = true;
                             somme = -1;
                         }
                     }
                 }
             }
         }
         if(!found) {
             indices = [];
         }
        res.json({
            indicesTableau: indices
        })
    }


}


module.exports  = new UserController();
