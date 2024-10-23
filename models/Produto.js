const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
    nome_produto: { type: String, required: true },
    quantidade: { type: Number, required: true },
    valor: { type: String, required: true }
});

const Produto = mongoose.model("Produto", produtoSchema);

module.exports = Produto;
