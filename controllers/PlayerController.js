const Player = require("../models/Player");

class PlayerController{
    async create(req,res){
        let {name, position, numjersey, age, nation} = req.body;
        if(name == undefined || name == '' || name == ' '){
            res.status(400);
            res.json({err: "Nome inválido!"});
            return;
        }

        const nameExists = await Player.validationName(name);
        if(nameExists){
            res.status(406);
            res.json({err: "Jogador já existe!"});
            return;
        }

        await Player.newPlayer(name, position, numjersey, age, nation);
        res.status(200);
        res.send("Jogador cadastrado!");
    }

    async search(req,res){
        const searchPlayer = req.body.searchPlayer;

        if(searchPlayer == undefined || searchPlayer == "" || searchPlayer == " "){
            res.status(406);
            res.send("Busca vazia");
            return;
        }

        const result = await Player.findPlayer(searchPlayer);
        res.status(200);
        res.json({result});
    }
}

module.exports = new PlayerController();