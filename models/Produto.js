const mongoose= require("mongoose")
const Produto = mongoose.model("produto",{
    nome_produto: String,
    quantidade: Number,
    valor: String
    
});

module.exports = Produto;