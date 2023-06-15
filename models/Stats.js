const knex = require("../database/connection");

class Stats{
    async newStats(goal, assists, matches, redcard,yellowcard,goalsConceded, cleanSheets, season, player_id){
        try{
            await knex.insert({goal, assists, matches, redcard,yellowcard,goalsConceded, cleanSheets, season, player_id})
            .table("stats");
        }catch(err){
            console.log(err);
        }
    }

    async findById(id){
        try{
            const stats = await knex.select("*").table("stats").where({id});

            if(stats.length>0){
                return stats[0];
            }else{
                return undefined;
            }
        }catch(err){
            return undefined;
        }
    }

    async findByPlayer_id(player_id){
        try{
            const stats = await knex.select("*").table("stats").where({player_id});

            if(stats.length>0){
                return stats;
            }else{
                return undefined;
            }
        }catch(err){
            return undefined;
        }
    }

    async validationSeason(season, player_id){
        try{
            const result = await knex.select("players.name").from("players")
            .innerJoin("stats", "stats.player_id", "players.id").where({season}).where({player_id});
            if(result.length>0){
                return true;
            }else{
                return false;
            }
        }catch(err){
            return false;
        }    
    }


    async update(id, goal, assists, matches, redcard,yellowcard,goalsConceded, cleanSheets, season, player_id){
        const stats = await this.findById(id);

        if(stats != undefined){
            let editStats = {};
            if(season != undefined){
                if(season != stats.season){
                    const result = await this.validationSeason(season, player_id);
                    if(result==false){
                        editStats.season = season;
                    }else{
                        return{status: false, err:"Essa temporada já está registrada"};
                    }
                }
            }

            if(goal != undefined){
                editStats.goal = goal;
            }
            if(assists != undefined){
                editStats.assists = assists;
            }
            if(matches!= undefined){
                editStats.matches = matches;
            }
            if(redcard != undefined){
                editStats.redcard = redcard;
            }
            if(yellowcard != undefined){
                editStats.yellowcard = yellowcard;
            }
            if(goalsConceded != undefined){
                editStats.goalsConceded = goalsConceded;
            }
            if(cleanSheets != undefined){
                editStats.cleanSheets = cleanSheets;
            }
            try{
                await knex.update(editStats).where({id}).table("stats");
                return{status: true};
            }catch(err){
                return{status:false, err: err};
            }
        }else{
            return {status: false, err: "A Estatística não existe"};
        }
    }

    async delete(id){
        const stats = await this.findById(id);

        if(stats != undefined){

            try{
                await knex.delete().where({id}).table("stats");
                return {status: true};
            }catch(err){
                return{status:false, err: err};
            }
        }else{
            return{status: false, err: "Temporada não existe, por isso não pode ser deletado!"};
        }
    }
}

module.exports = new Stats();