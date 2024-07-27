const Root = require('../models/userRoot');
const HassPassWorld = require('../middlewares/HassPassWorld');
const Decode = require('../middlewares/Decode');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');



class UserRootControolers{
      // [POST] /root/creater_Root_User
      async create(req, res, next) {
        try {
            req.body.passWorld = await HassPassWorld(req.body.passWorld); 
            var formdata = req.body;
            const userRoot = new Root(formdata);
            userRoot.save()
                .then((savedRoot) => {
                    res.json(savedRoot);
                })
                .catch(err => {
                    next(err);
                });
        } catch (err) {
            next(err); 
        }
    }

    

     
    // [POST] /root/login_root
    async Login(req, res, next) {
        try {
            const findingData = await Root.findOne({name:req.body.name});
            
            if(findingData){
                const match = await Decode(req.body.passWorld,findingData.passWorld);

                if(match){

                    //config 
                    const {privateKey,publicKey} = crypto.generateKeyPairSync('rsa',{
                        modulusLength: 4096
                    })

                    const token = jwt.sign( {
                        userId: findingData._id,name:findingData.name,role:['0']},privateKey,{
                        algorithm: 'RS256',
                        expiresIn: '1h'
                    })
                    
                   // Convert publicKeyObject to PEM format
                    const publicKeyPEM = publicKey.export({ type: 'spki', format: 'pem' });

                    const updateRoot = await Root.findByIdAndUpdate(
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

    // [GET] /root/all_root
    async findAllRoot(req, res, next) {
        try {
            const findingData = await Root.find({});
            res.json(findingData);
        } catch (err) {
            next(err);
        }
    }


        

}

module.exports = new UserRootControolers;