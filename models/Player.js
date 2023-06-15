const knex = require("../database/connection");

class Player{
    async newPlayer(name, position, numjersey, age, nation){
        try{
            await knex.insert({name, position, numjersey, age, nation}).table("players");
        }catch(err){
            console.log(err);
        }
    }

    async validationName(name){
        try{
            const result = await knex.select("*").from("players").where({name:name});
            if(result.length>0){
                return true;
            }else{
                return false;
            }
        }catch(err){

        }
      
    }
    async findPlayer(searchData){
        try{
            var result = await knex.select('*').table("players")
            .where({name: searchData}).orWhere({numjersey:searchData}).orWhere({position: searchData});
            if(result.length > 0){
                return result;
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = new Player();