const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const Person = require('./models/Person');
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
    res.json({ message: "rodou" });
});

// Create
app.post("/person", async (req, res) => {
    const { nome, rg, cpf, endereco, cidade, telefone } = req.body;

    const person = {
        nome,
        rg: encrypt(rg), // Criptografa o RG
        cpf: encrypt(cpf), // Criptografa o CPF
        endereco,
        cidade,
        telefone
    };

    try {
        await Person.create(person);
        res.status(201).json({ message: "cliente cadastrado!" });
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});

// Read
app.get("/person", async (req, res) => {
    try {
        const people = await Person.find();
        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});

// Conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017").then(() => {
    console.log("uhull conectamos!");
    app.listen(3000);
}).catch((err) => {
    console.log(err);
});

// Read by id
app.get("/person/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const person = await Person.findOne({ _id: id });
        if (!person) {
            res.status(422).json({ message: "cliente não encontrado!" });
            return;
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});

// Update
app.patch("/person/:id", async (req, res) => {
    const id = req.params.id;
    const { nome, rg, cpf, endereco, cidade, telefone } = req.body;

    const person = {
        nome,
        rg: encrypt(rg), // Criptografa o RG
        cpf: encrypt(cpf), // Criptografa o CPF
        endereco,
        cidade,
        telefone
    };

    try {
        const updatePerson = await Person.updateOne({ _id: id }, person);
        if (updatePerson.matchedCount === 0) {
            res.status(422).json({ message: "cliente não encontrado" });
            return;
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});

// Delete
app.delete("/person/:id", async (req, res) => {
    const id = req.params.id;
    const person = await Person.findOne({ _id: id });

    if (!person) {
        res.status(422).json({ message: "cliente não encontrado" });
        return;
    }

    try {
        await Person.deleteOne({ _id: id });
        res.status(200).json({ message: "cliente removido com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: error });
    }
});
