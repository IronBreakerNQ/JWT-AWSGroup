const bcrypt = require('bcrypt');

async function Decode(inputPassword,hashedPassword){
    try{
        const match = await bcrypt.compare(inputPassword,hashedPassword);
        return match;
    }catch(err){
        throw(err);
    }
}

module.exports = Decode;