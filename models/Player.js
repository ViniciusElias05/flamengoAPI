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
            return false;
        }
      
    }
    async findPlayer(searchData){
        try{
            const result = await knex.select('*').table("players")
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

    async findAllPlayers(){
        try{
            const result = await knex.select('*').table("players");
            return result;
        }catch(err){
            return [];
        }
    }

    async findById (id){
        try{
            const result = await knex.select("*").where({id:id}).table("players");
            if(result.length>0){
                return result[0];
            }else{
                return undefined;
            }
        }catch{
            return undefined;
        }
    }

    async update(id, name, position, numjersey, nation, age){
        const player = await this.findById(id);

        if(player != undefined){
            let editPlayer = {};
            if(name != undefined){
                if(name != player.name){
                    const result = await this.validationName(name);
                    if(result==false){
                        editPlayer.name = name;
                    }else{
                        return{status: false, err:"O e-mail já está cadastrado!"};
                    }
                }
            }

            if(position != undefined){
                editPlayer.position = position;
            }
            if(numjersey != undefined){
                editPlayer.numjersey = numjersey;
            }
            if(nation != undefined){
                editPlayer.nation = nation;
            }
            if(age != undefined){
                editPlayer.age = age;
            }
            try{
                await knex.update(editPlayer).where({id:id}).table("players");
                return{status: true};
            }catch(err){
                return{status:false, err: err};
            }
        }else{
            return {status: false, err: "O usuário não existe"};
        }
    }

    async delete(id){
        const player = await this.findById(id);

        if(player != undefined){

            try{
                await knex.delete().where({id}).table("players");
                return {status: true};
            }catch(err){
                return{status:false, err: err};
            }
        }else{
            return{status: false, err: "Jogador não existe, por isso não pdoe ser deletado!"};
        }
    }

}

module.exports = new Player();