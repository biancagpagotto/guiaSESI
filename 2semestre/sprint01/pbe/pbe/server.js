const express = require("express");
const fs = require("fs");

const app = express();

const routes = require("./src/routes");

const PORTA = 3000;

// Permite receber JSON
app.use(express.json());

// Permite receber dados de formulário
app.use(express.urlencoded({ extended: true }));

app.use(routes);

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

// INICIAR SERVIDOR

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});