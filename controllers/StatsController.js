const Stats = require("../models/Stats");

class StatsController{
    async create(req,res){
        const {goal, assists, matches, redcard,yellowcard,goalsConceded, cleanSheets, season, player_id} = req.body;

        if(player_id == undefined || player_id ==""|| player_id == " "){
            res.status(404);
            res.send("Dados inválidos");
        }
        await Stats.newStats(goal, assists, matches, redcard,yellowcard,goalsConceded, cleanSheets, season, player_id);
        res.send("Estatística adicionada");

    }

    async edit(req,res){
        const id = req.params.id;
        const {goal, assists, matches, redcard, yellowcard, goalsConceded, cleanSheets, season, player_id} = req.body;
        const result = await Stats.update(id, goal, assists, matches, redcard,yellowcard,goalsConceded, cleanSheets, season, player_id);
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
        const result = await Stats.delete(id);

        if(result.status){
            res.send("Temporada deletada");
        }else{
            res.status(404);
            res.json(result.err);
        }
    }

}

module.exports = new StatsController();