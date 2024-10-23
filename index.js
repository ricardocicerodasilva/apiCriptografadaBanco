const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const Cliente = require('./models/Cliente');
const Loja = require('./models/Loja');
const Produto = require('./models/Produto');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Função para criptografar dados
const encrypt = (text) => {
    const cipher = crypto.createCipher('aes-256-cbc', 'sua-senha-secreta'); // Use uma senha segura
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

// Rota inicial
app.get('/', (req, res) => {
    res.json({ message: "Servidor rodando!" });
});

// Create Cliente
app.post("/cliente", async (req, res) => {
    const { nome, rg, cpf, endereco, cidade, telefone } = req.body;

    const clienteData = {
        nome,
        rg: encrypt(rg),
        cpf: encrypt(cpf),
        endereco,
        cidade,
        telefone
    };

    try {
        await Cliente.create(clienteData);
        res.status(201).json({ message: "Cliente cadastrado!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar cliente." });
    }
});

// Create Loja
app.post("/loja", async (req, res) => {
    const { nome_loja, unidade } = req.body;

    const lojaData = {
        nome_loja,
        unidade
    };

    try {
        await Loja.create(lojaData);
        res.status(201).json({ message: "Loja cadastrada!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar loja." });
    }
});

// Create Produto
app.post("/produto", async (req, res) => {
    const { nome_produto, quantidade, valor } = req.body;

    const produtoData = {
        nome_produto,
        quantidade,
        valor
    };

    try {
        await Produto.create(produtoData);
        res.status(201).json({ message: "Produto cadastrado!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao cadastrar produto." });
    }
});

// Read Cliente
app.get("/cliente", async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar clientes." });
    }
});

// Read Loja
app.get("/loja", async (req, res) => {
    try {
        const lojas = await Loja.find();
        res.status(200).json(lojas);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar lojas." });
    }
});

// Read Produto
app.get("/produto", async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar produtos." });
    }
});

// Conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/seuBancoDeDados", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com o MongoDB estabelecida!");
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
}).catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
});

// Read Cliente by id
app.get("/cliente/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado!" });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar cliente." });
    }
});

// Read Loja by id
app.get("/loja/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const loja = await Loja.findById(id);
        if (!loja) {
            return res.status(404).json({ message: "Loja não encontrada!" });
        }
        res.status(200).json(loja);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar loja." });
    }
});

// Read Produto by id
app.get("/produto/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const produto = await Produto.findById(id);
        if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado!" });
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar produto." });
    }
});

// Update Cliente
app.patch("/cliente/:id", async (req, res) => {
    const id = req.params.id;
    const { nome, rg, cpf, endereco, cidade, telefone } = req.body;

    const clienteData = {
        nome,
        rg: encrypt(rg),
        cpf: encrypt(cpf),
        endereco,
        cidade,
        telefone
    };

    try {
        const updateResult = await Cliente.updateOne({ _id: id }, clienteData);
        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }
        res.status(200).json(clienteData);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar cliente." });
    }
});

// Update Loja
app.patch("/loja/:id", async (req, res) => {
    const id = req.params.id;
    const { nome_loja, unidade } = req.body;

    const lojaData = {
        nome_loja,
        unidade
    };

    try {
        const updateResult = await Loja.updateOne({ _id: id }, lojaData);
        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ message: "Loja não encontrada." });
        }
        res.status(200).json(lojaData);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar loja." });
    }
});

// Update Produto
app.patch("/produto/:id", async (req, res) => {
    const id = req.params.id;
    const { nome_produto, quantidade, valor } = req.body;

    const produtoData = {
        nome_produto,
        quantidade,
        valor
    };

    try {
        const updateResult = await Produto.updateOne({ _id: id }, produtoData);
        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }
        res.status(200).json(produtoData);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar produto." });
    }
});

// Delete Cliente
app.delete("/cliente/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado." });
        }
        await Cliente.deleteOne({ _id: id });
        res.status(200).json({ message: "Cliente removido com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover cliente." });
    }
});

// Delete Loja
app.delete("/loja/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const loja = await Loja.findById(id);
        if (!loja) {
            return res.status(404).json({ message: "Loja não encontrada." });
        }
        await Loja.deleteOne({ _id: id });
        res.status(200).json({ message: "Loja removida com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover loja." });
    }
});

// Delete Produto
app.delete("/produto/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const produto = await Produto.findById(id);
        if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }
        await Produto.deleteOne({ _id: id });
        res.status(200).json({ message: "Produto removido com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao remover produto." });
    }
});
