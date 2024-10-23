const mongoose= require("mongoose")
const Loja = mongoose.model("loja",{
    nome_loja: String,
   unidade: String
});

module.exports = Loja;