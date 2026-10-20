const fs = require("fs");

function cadastrarTarefa(req, res) {

    const { titulo, disciplina, prazo } = req.body;

    if (!titulo || !disciplina || !prazo) {
        return res.status(400).json({
            mensagem: "Preencha título, disciplina e prazo."
        });
    }

    const dados = JSON.parse(
        fs.readFileSync("./dados/dados.json", "utf8")
    );

    const novaTarefa = {
        id: dados.tarefas.length + 1,
        titulo: titulo,
        disciplina: disciplina,
        prazo: prazo,
        status: "Pendente"
    };

    dados.tarefas.push(novaTarefa);

    fs.writeFileSync(
        "./dados/dados.json",
        JSON.stringify(dados, null, 4)
    );

    res.status(201).json({
        mensagem: "Tarefa cadastrada com sucesso!",
        tarefa: novaTarefa
    });
}

module.exports = cadastrarTarefa;