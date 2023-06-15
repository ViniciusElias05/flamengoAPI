const knex = require("../database/connection");

class Player{
    async newPlayer(name, position, numjersey, age, nation){
        try{
            await knex.insert({name, position, numjersey, age, nation}).table("players");
        }catch(err){
            console.log(err);
        }
    }

    async findName(name){
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
}

module.exports = new Player();