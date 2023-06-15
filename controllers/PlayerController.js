const Player = require("../models/Player");

class PlayerController{
    async create(req,res){
        let {name, position, numjersey, age, nation} = req.body;
        if(name == undefined || name == '' || name == ' '){
            res.status(400);
            res.json({err: "Nome inválido!"});
            return;
        }

        const nameExists = await Player.findName(name);
        if(nameExists){
            res.status(406);
            res.json({err: "Jogador já existe!"});
            return;
        }

        await Player.newPlayer(name, position, numjersey, age, nation);
        res.status(200);
        res.send("Jogador cadastrado!");
    }
}

module.exports = new PlayerController();