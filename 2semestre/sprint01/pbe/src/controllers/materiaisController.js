const fs = require("fs");

function cadastrarMaterial(req, res) {

    const { titulo, disciplina, tipo, link } = req.body;

    if (!titulo || !disciplina || !tipo || !link) {
        return res.status(400).json({
            mensagem: "Preencha título, disciplina, tipo e link."
        });
    }

    const dados = JSON.parse(
        fs.readFileSync("./dados/dados.json", "utf8")
    );

    const novoMaterial = {
        id: dados.materiais.length + 1,
        titulo: titulo,
        disciplina: disciplina,
        tipo: tipo,
        link: link
    };

    dados.materiais.push(novoMaterial);

    fs.writeFileSync(
        "./dados/dados.json",
        JSON.stringify(dados, null, 4)
    );

    res.status(201).json({
        mensagem: "Material cadastrado com sucesso!",
        material: novoMaterial
    });
}

module.exports = cadastrarMaterial;