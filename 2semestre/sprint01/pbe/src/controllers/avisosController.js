const fs = require("fs");

function cadastrarAviso(req, res) {

    const tipo = req.headers["tipo-usuario"];

    if (tipo !== "professor" && tipo !== "coordenacao") {
        return res.status(403).json({
            mensagem: "Você não tem permissão para cadastrar avisos."
        });
    }

    const { titulo, mensagem, data } = req.body;

    if (!titulo || !mensagem || !data) {
        return res.status(400).json({
            mensagem: "Preencha título, mensagem e data."
        });
    }

    const dados = JSON.parse(
        fs.readFileSync("./dados/dados.json", "utf8")
    );

    const novoAviso = {
        id: dados.avisos.length + 1,
        titulo: titulo,
        mensagem: mensagem,
        data: data
    };

    dados.avisos.push(novoAviso);

    fs.writeFileSync(
        "./dados/dados.json",
        JSON.stringify(dados, null, 4)
    );

    res.status(201).json({
        mensagem: "Aviso cadastrado com sucesso!",
        aviso: novoAviso
    });
}

module.exports = cadastrarAviso;