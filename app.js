const express = require('express')
const path = require('path')
const mongoose = require('./service/db')
const app = express()
const Contato = require('./models/Contato')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contato.html'))
});

app.get('/produtos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'produtos.html'))
});

app.post('/contato', async (req, res) => {
    const { nome, email, telefone, mensagem, contato, horario, novidades } = req.body;
    try {
        // Crie um novo documento do modelo Contato
        const novoContato = new Contato({
            nome,
            email,
            telefone,
            mensagem,
            contato,
            horario,
            novidades
        });

        // Salve o novo documento no banco de dados
        await novoContato.save();

        // Envie uma resposta de sucesso
        res.status(201).json({ message: 'Contato enviado com sucesso' });
    } catch (error) {
        // Se ocorrer um erro, envie uma resposta de erro
        console.error('Erro ao enviar contato:', error);
        res.status(500).json({ error: 'Erro ao enviar contato' });
    }
})

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
})

