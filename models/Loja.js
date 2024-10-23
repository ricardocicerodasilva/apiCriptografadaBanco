const mongoose = require("mongoose");

const lojaSchema = new mongoose.Schema({
    nome_loja: { type: String, required: true },
    unidade: String
});

const Loja = mongoose.model("Loja", lojaSchema);

module.exports = Loja;
