const mongoose = require('mongoose');

const Contato = mongoose.model('Contato',{
    nome: String,
    email: String,
    telefone: String,
    mensagem: String,
    contato: String,
    horario: String,
    novidades: Boolean
})

module.exports = Contato;