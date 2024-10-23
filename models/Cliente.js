const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    rg: { type: String, required: true },
    cpf: { type: String, required: true },
    endereco: String,
    cidade: String,
    telefone: String
});

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = Cliente;
