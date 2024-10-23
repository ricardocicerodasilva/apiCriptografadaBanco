const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
    nome: String,
    rg: String,
    cpf: String,
    endereco: String,
    cidade: String,
    telefone: String,
    email: String,
    senha: String, 
});

const Cliente = mongoose.model("Cliente", clienteSchema);

module.exports = Cliente;
