
class HomeController{
    async index(req,res){
        res.send("Iniciando API-Flamengo");
    }
}

module.exports = new HomeController();