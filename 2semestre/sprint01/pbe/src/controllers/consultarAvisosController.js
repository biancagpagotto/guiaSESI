const fs = require("fs");

function consultarAvisos(req, res) {

    const dados = JSON.parse(
        fs.readFileSync("./dados/dados.json", "utf8")
    );

    res.json({
        avisos: dados.avisos
    });

}

module.exports = consultarAvisos;