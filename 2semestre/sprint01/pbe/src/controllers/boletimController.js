function consultarBoletim(req, res) {

    res.json({
        aluno: "Helena Politti",
        disciplinas: [
            { disciplina: "Matemática", nota: 8.5, faltas: 2 },
            { disciplina: "Português", nota: 9.0, faltas: 1 },
            { disciplina: "História", nota: 7.5, faltas: 3 },
            { disciplina: "Ciências", nota: 8.0, faltas: 2 }
        ]
    });

}

module.exports = consultarBoletim;