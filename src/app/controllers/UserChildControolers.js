const Child = require('../models/userChild');
const Admin = require('../models/userAdmin');
const HassPassWorld = require('../middlewares/HassPassWorld');
const Decode = require('../middlewares/Decode');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class UserChildControolers{
      // [POST] /child/creater_child_User
      async create(req, res, next) {
        try {
            const adminId = req.user.userId;
            req.body.passWorld = await HassPassWorld(req.body.passWorld);
            var formdata = req.body;
            const userChild = new Child(formdata);
            
            const savechild = await userChild.save();
            const upadeadmin=  await Admin.findByIdAndUpdate(
                adminId,
                { $push: { children: savechild._id } },
                { new: true }
            );

            res.json(savechild);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }


     // [POST] /root/login_root
     async Login(req, res, next) {
        try {
            const findingData = await Child.findOne({name:req.body.name});
            
            if(findingData){
                const match = await Decode(req.body.passWorld,findingData.passWorld);

                if(match){

                    //config 
                    const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                        modulusLength: 4096
                    })

                    const token = jwt.sign( {
                        userId: findingData._id,name:findingData.name,role:['2']},privateKey,{
                        algorithm: 'RS256',
                        expiresIn: '1h'
                    })
                    
                   // Convert publicKeyObject to PEM format
                    const publicKeyPEM = publicKey.export({ type: 'spki', format: 'pem' });

                    const updateChild = await Child.findByIdAndUpdate(
                        findingData._id, 
                        { publicKey: publicKeyPEM }, 
                        { new: true } 
                    )

                    res.json(token);
                }else{
                    res.json({err:'Invalid credentials'})
                }
            }else{
                res.json('User name or passworld not correct ');
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserChildControolers();