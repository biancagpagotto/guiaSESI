function consultarAgenda(req, res) {

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

}

module.exports = consultarAgenda;