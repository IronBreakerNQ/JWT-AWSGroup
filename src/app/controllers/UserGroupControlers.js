//db config
const Admin = require('../models/userAdmin');
const User = require('../models/userChild');
const Group = require('../models/usegroup');
const Taska = require('../models/taska');
const Taskb = require('../models/taskb');
const Taskc = require('../models/taskc');

// middleware config
const HassPassWorld = require('../middlewares/HassPassWorld');
const Decode = require('../middlewares/Decode');

// library config
const JWT = require('jsonwebtoken');
const crypto = require('crypto');


class UserGroupControlers {
    // [POST] /group/create
    async create(req,res,next){
        try{
            const adminId = req.user.userId
            req.body.admin = adminId;
            let formdata = req.body;
            const UserGroup = new Group(formdata)
            const SaveGroup = await UserGroup.save();

            const updateGroup = await Admin.findByIdAndUpdate(
                adminId,
                { $push: {Group: SaveGroup._id} },
                { new: true}
            )
            res.json(SaveGroup);
        }catch(err){
            console.log(err);
            next(err);
        }
    }
}

module.exports = new UserGroupControlers();
