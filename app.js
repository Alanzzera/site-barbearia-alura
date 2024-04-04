const express = require('express')
const path = require('path')
const mongoose = require('./service/db')
const transporter = require('./service/email')
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

        const nomeM = nome.toUpperCase()
        // Construir o corpo do email em formato HTML
        const htmlEmail = `
        <style>
        /* Estilos CSS */
        .container {
            border: 2px solid #ccc; /* Adiciona uma borda ao redor do container */
            padding: 10px; /* Adiciona espaço interno ao container */
            font-family: Arial, sans-serif; /* Define a família de fontes */
            font-size: 16px; /* Define o tamanho da fonte */
            line-height: 1.6; /* Define a altura da linha para melhor legibilidade */
        }
        .mensagem {
            margin-bottom: 10px; /* Adiciona espaço abaixo da mensagem */
        }
        </style>
        <div class="container">
        <img src="https://github.com/Alanzzera/site-barbearia-alura/blob/1cb231e2d4e4dade242fe38b16f9b9d33b77d73a/public/assets/img/logo.png?raw=true" alt="Logo da Barbearia Alura" class="logo">
            <h1>Contato - Barbearia Alura</h1>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Mensagem:</strong></p>
            <div class="mensagem">
                ${mensagem}
            </div>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Contato:</strong> ${contato}</p>
            <p><strong>Horário:</strong> ${horario}</p>
        </div>
        `;

        // Envia um email
        await transporter.sendMail({
            from: transporter.options.auth.user, // Pegando o e-mail do remetente do arquivo email.js
            to: transporter.options.auth.user,
            cc: email, // Pegando o e-mail do destinatário do arquivo email.js
            replyTo: email,
            subject: `Contato - Barbearia Alura - Cliente ${nomeM}`,
            html: htmlEmail
        });

        // Salve o novo documento no banco de dados
        await novoContato.save()

        // Envie uma resposta de sucesso
        res.status(201).json({ message: 'Contato enviado com sucesso' })

    } catch (error) {
        // Se ocorrer um erro, envie uma resposta de erro
        console.error('Erro ao enviar contato:', error)
        res.status(500).json({ error: 'Erro ao enviar contato' })
    }
})

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
})

