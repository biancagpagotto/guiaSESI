const express = require("express");

const app = express();

const PORTA = 3000;

const routes = require("./src/routes");

// Permite receber JSON
app.use(express.json());

// Permite receber dados de formulário
app.use(express.urlencoded({ extended: true }));

// Utiliza as rotas
app.use(routes);

// Iniciar servidor
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});