const User = require('../model/User');

module.exports = {
    async findAllPsycologists(req, res){
        
            const Psycologists = await User.findAll({ 
                where: {
                    perfil: 2,
                },
            });
            return res.json(Psycologists);
        
    },
}