const express = require("express");
const fs = require("fs");

const router = express.Router();

// VERIFICAR TIPO DE USUÁRIO

function verificarTipo(tipoPermitido) {

    return (req, res, next) => {

        const tipo = req.headers["tipo-usuario"];

        if (tipo !== tipoPermitido) {

            return res.status(403).json({
                mensagem: "Você não tem permissão para acessar esta área."
            });

        }

        next();
    };
}

// ROTA INICIAL

router.get("/", (req, res) => {
    res.send("API GuiaSESI funcionando!");
});

// LOGIN

router.post("/login", (req, res) => {

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
});

// ÁREA DO ALUNO

router.get("/aluno", verificarTipo("aluno"), (req, res) => {
    res.json({
        mensagem: "Bem-vindo à área do aluno!",
        permissoes: [
            "Visualizar boletim",
            "Visualizar tarefas",
            "Visualizar materiais",
            "Visualizar agenda",
            "Visualizar avisos"
        ]
    });
});

// ÁREA DO PROFESSOR

router.get("/professor", verificarTipo("professor"), (req, res) => {
    res.json({
        mensagem: "Bem-vindo à área do professor!",
        permissoes: [
            "Visualizar alunos",
            "Cadastrar tarefas",
            "Enviar materiais",
            "Visualizar agenda",
            "Enviar avisos"
        ]
    });
});

// ÁREA DA COORDENAÇÃO

router.get("/coordenacao", verificarTipo("coordenacao"), (req, res) => {
    res.json({
        mensagem: "Bem-vindo à área da coordenação!",
        permissoes: [
            "Gerenciar alunos",
            "Gerenciar professores",
            "Gerenciar avisos",
            "Gerenciar agenda"
        ]
    });
});

// BOLETIM

router.get("/boletim", verificarTipo("aluno"), (req, res) => {
    res.json({
        aluno: "Helena Politti",
        disciplinas: [
            {
                disciplina: "Matemática",
                nota: 8.5,
                faltas: 2
            },
            {
                disciplina: "Português",
                nota: 9.0,
                faltas: 1
            },
            {
                disciplina: "História",
                nota: 7.5,
                faltas: 3
            },
            {
                disciplina: "Ciências",
                nota: 8.0,
                faltas: 2
            }
        ]
    });
});

// TAREFAS

router.get("/tarefas", verificarTipo("aluno"), (req, res) => {

    const dados = JSON.parse(
        fs.readFileSync("./dados/dados.json", "utf8")
    );

    res.json({
        tarefas: dados.tarefas
    });
});

// AVISOS

router.get("/avisos", verificarTipo("aluno"), (req, res) => {

    const dados = JSON.parse(
        fs.readFileSync("./dados/dados.json", "utf8")
    );

    res.json({
        avisos: dados.avisos
    });
});

// MATERIAIS

router.get("/materiais", verificarTipo("aluno"), (req, res) => {

    const dados = JSON.parse(
        fs.readFileSync("./dados/dados.json", "utf8")
    );

    res.json({
        materiais: dados.materiais
    });
});

// AGENDA

router.get("/agenda", verificarTipo("aluno"), (req, res) => {
    res.json({
        eventos: [
            {
                id: 1,
                titulo: "Prova de Matemática",
                data: "2026-10-06",
                horario: "08:00",
                local: "Sala 12"
            },
            {
                id: 2,
                titulo: "Entrega do trabalho de História",
                data: "2026-10-08",
                horario: "10:00",
                local: "Sala 8"
            },
            {
                id: 3,
                titulo: "Reunião de turma",
                data: "2026-10-10",
                horario: "14:00",
                local: "Auditório"
            }
        ]
    });
});

// CADASTRAR TAREFA

router.post("/tarefas", verificarTipo("professor"), (req, res) => {

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
});

// CADASTRAR AVISO

router.post("/avisos", (req, res) => {

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
});

// CADASTRAR MATERIAL

router.post("/materiais", verificarTipo("professor"), (req, res) => {

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
});

module.exports = router;