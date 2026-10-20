const fs = require("fs");

function consultarMateriais(req, res) {

    const dados = JSON.parse(
        fs.readFileSync("./dados/dados.json", "utf8")
    );

    res.json({
        materiais: dados.materiais
    });

}

module.exports = consultarMateriais;