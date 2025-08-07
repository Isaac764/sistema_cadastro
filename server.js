const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB Atlas
mongoose.connect('SUA_STRING_DE_CONEXAO_AQUI', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Erro na conexão:", err));

// Schema e Modelo
const RegistroSchema = new mongoose.Schema({
    nome: String,
    cpf: String,
    municipio: String,
    celular: String,
    estado: String,
    unidade: String,
    procon: String
});

const Registro = mongoose.model('Registro', RegistroSchema);

// Rota para receber POST do formulário
app.post('/api/registrar', async (req, res) => {
    try {
        const novo = new Registro(req.body);
        await novo.save();
        res.status(201).json({ mensagem: "Dados salvos com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao salvar dados." });
    }
});

// Inicializa servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Servidor rodando na porta ${PORT}');
});