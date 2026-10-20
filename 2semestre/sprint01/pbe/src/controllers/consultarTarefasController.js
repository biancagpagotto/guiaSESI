const fs = require("fs");

function consultarTarefas(req, res) {

    const dados = JSON.parse(
        fs.readFileSync("./dados/dados.json", "utf8")
    );

    res.json({
        tarefas: dados.tarefas
    });

}

module.exports = consultarTarefas;