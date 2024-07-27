const Root = require('../models/userRoot');
const Admin = require('../models/userAdmin');
const HassPassWorld = require('../middlewares/HassPassWorld');
const Decode = require('../middlewares/Decode');
const JWT = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
class UserAdminControllers {
    // [POST] /admin/create_admin_user
    async create(req, res, next) {
        try {
            const rootId = req.user.userId;
            req.body.passWorld = await HassPassWorld(req.body.passWorld);
            var formdata = req.body;
            const userAdmin = new Admin(formdata);
            
            const saveAdmin = await userAdmin.save();
            const upaderoot=  await Root.findByIdAndUpdate(
                rootId,
                { $push: { Admin: saveAdmin._id } },
                { new: true }
            );

            res.json(saveAdmin);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

      // [POST] /admin/login
      async Login(req, res, next) {
        try {
            const findingData = await Admin.findOne({name:req.body.name});
           
            if(findingData){
                const match = await Decode(req.body.passWorld,findingData.passWorld);

                if(match){
                    if(match.publicKey){
                        req.body.firtKey = false;
                    }
                    // congfig 
                    const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                        modulusLength: 4096
                    })

                    const token = JWT.sign( {
                        userId: findingData._id,name:findingData.name,role:['1']},privateKey,{
                        algorithm: 'RS256',
                        expiresIn: '1h'
                    })
                    

                      // Convert publicKeyObject to PEM format
                      const publicKeyPEM = publicKey.export({ type: 'spki', format: 'pem' });

                      const updateAdmin = await Admin.findByIdAndUpdate(
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


    //[POST] admin/test
    async test(req,res,next){
        try{
            const rootId = req.user.userId;
            const userName = req.user.userName;
            
            res.json(rootId);
        }catch(err){
            res.status(500).json({ error: 'Something went wrong' });
        }
      
    }
}

module.exports = new UserAdminControllers();
