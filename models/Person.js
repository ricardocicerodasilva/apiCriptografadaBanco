const mongoose= require("mongoose")
const Person = mongoose.model("person",{
    nome: String,
    rg: String,
    cpf: String,
    endereco: String,
    cidade: String,
    telefone: String
});

module.exports = Person;