const Player = require("../models/Player");
const Stats = require("../models/Stats");

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
    };

    async search(req,res){
        const searchPlayer = req.body.searchPlayer;

        if(searchPlayer == undefined || searchPlayer == "" || searchPlayer == " "){
            res.status(404);
            res.send("Jogador não encontrado");
            return;
        }

        const result = await Player.findPlayer(searchPlayer);
        res.status(200);
        res.json(result);
    };

    async watchAll(req,res){
        
        const players = await Player.findAllPlayers();
        if(players == []){
            res.status(503);
            res.send("Ocorrorreu um erro no servidor");
            return;
        }
        res.json(players);
    };

    async findPlayer(req,res){
        const id = req.params.id;
        const player = await Player.findById(id);
        const stats = await Stats.findByPlayer_id(id);

        if(player == undefined){
            res.status(404);
            res.send("Jogador não existente!");
            return;
        }
            res.json({Player: player, Stats: stats});


    }

    async edit(req,res){
        const id = req.params.id;
        const {name, position, numjersey, nation, age} = req.body;
        const result = await Player.update(id,name,position, numjersey, nation, age);
        if(result.status != undefined){
            if(result.status){
                res.send("Registro atualizado");
            }else{
                res.status(406);
                res.send(result.err);
            }
        }else{
            res.status(503);
            res.send("Ocorrorreu um erro no servidor");
        }
    }

    async remove(req,res){
        const id = req.params.id;
        const result = await Player.delete(id);
            if(result.status){
                res.send("Jogador deletado");
            }else{
                res.status(406);
                res.send(result.err);
            }
    }
}

module.exports = new PlayerController();