const fs = require("fs");

function login(req, res) {

    const { email, senha } = req.body;

    const dados = JSON.parse(
        fs.readFileSync("./dados/dados.json", "utf8")
    );

    const usuario = dados.usuarios.find(
        usuario =>
            usuario.email === email &&
            usuario.senha === senha
    );

    if (!usuario) {
        return res.status(401).json({
            mensagem: "E-mail ou senha incorretos."
        });
    }

    res.json({
        mensagem: "Login realizado com sucesso!",
        usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo
        }
    });
}

module.exports = login;