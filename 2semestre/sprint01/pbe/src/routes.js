const express = require("express");

const loginController = require("./controllers/loginController");
const cadastrarTarefa = require("./controllers/tarefasController");
const cadastrarAviso = require("./controllers/avisosController");
const cadastrarMaterial = require("./controllers/materiaisController");
const consultarBoletim = require("./controllers/boletimController");
const consultarAgenda = require("./controllers/agendaController");
const consultarTarefas = require("./controllers/consultarTarefasController");
const consultarAvisos = require("./controllers/consultarAvisosController");
const consultarMateriais = require("./controllers/consultarMateriaisController");

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

router.post("/login", loginController);

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

router.get("/boletim", verificarTipo("aluno"), consultarBoletim);

// TAREFAS

router.get("/tarefas", verificarTipo("aluno"), consultarTarefas);

// AVISOS

router.get("/avisos", verificarTipo("aluno"), consultarAvisos);

// MATERIAIS

router.get("/materiais", verificarTipo("aluno"), consultarMateriais);

// AGENDA

router.get("/agenda", verificarTipo("aluno"), consultarAgenda);

// CADASTRAR TAREFA

router.post("/tarefas", verificarTipo("professor"), cadastrarTarefa);

// CADASTRAR AVISO

router.post("/avisos", cadastrarAviso);

// CADASTRAR MATERIAL

router.post("/materiais", verificarTipo("professor"), cadastrarMaterial);

module.exports = router;