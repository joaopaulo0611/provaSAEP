import express from 'express';
import cors from 'cors';
import DatabasePostgres from './database-postgres.js';  // Alteração aqui: uso de export default

const app = express();
const database = new DatabasePostgres();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
});

//rotas de teste
app.get("/", (req, res) => {
    return res.send("Teste");
});

//rotas crud musica

app.post('/musicas', async (req, res) => {
    try {
        const body = req.body;
        await database.createMusica(body);
        res.status(201).send("Musica criada com sucesso!");
    } catch (error) {
        console.error("Erro ao criar musica!", error);
        res.status(500).send("Erro ao criar musica.");
    }
});

app.get('/musicas', async (req, res) => {
    try {
        const musicas = await database.listMusicas();
        res.status(200).json(musicas);
    } catch (error) {
        console.error("Erro ao buscar música!", error);
        res.status(500).send("Erro ao buscar música.");
    }
});

app.delete('/musicas/:id', async (req, res) => {
    try {
        const musicaId = req.params.id;
        await database.deleteMusica(musicaId);
        res.status(200).send("Música deletada com sucesso.");
    } catch (error) {
        if (error.message === 'Música não encontrada') {
            res.status(404).send("Música não encontrada.");
        } else {
            console.error("Erro ao deletar música!", error);
            res.status(500).send("Erro ao deletar música.");
        }
    }
});

app.put('/musicas/:id', async (req, res) => {
    try {
        const id_musica = req.params.id;
        const { nome_musica, album_musica, artista_musica, tempo_duracao } = req.body;

        const alteracoes = {
            nome_musica,
            album_musica,
            artista_musica,
            tempo_duracao,
        };

        await database.updateMusica(id_musica, alteracoes);
        res.status(200).send("Música atualizada com sucesso.");
    } catch (error) {
        if (error.message === 'Música não encontrada') {
            res.status(404).send("Música não encontrada.");
        } else {
            console.error("Erro ao atualizar música!", error);
            res.status(500).send("Erro ao atualizar música.");
        }
    }
});

//rotas usuario

// Criar usuário (rota POST)
app.post('/usuarios', async (req, res) => {
    const body = req.body;
    try {
        await database.createUsuarios(body);
        console.log('Usuário criado com sucesso:', body);
        res.status(201).send("Usuário criado com sucesso!");
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send({ message: 'Erro interno ao criar usuário' });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await database.listUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).send({ message: 'Erro interno ao listar usuários' });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    const usuarioID = req.params.id;
    const body = req.body;
    try {
        await database.updateUsuarios(usuarioID, body);
        console.log(`Usuário ${usuarioID} atualizado com sucesso`);
        res.status(204).send();
    } catch (error) {
        console.error(`Erro ao atualizar usuário ${usuarioID}:`, error);
        res.status(500).send({ message: 'Erro interno ao atualizar usuário' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    const usuarioID = req.params.id;
    try {
        await database.deleteUsuarios(usuarioID);
        console.log(`Usuário ${usuarioID} deletado com sucesso`);
        res.status(204).send();
    } catch (error) {
        console.error(`Erro ao deletar usuário ${usuarioID}:`, error);
        res.status(500).send({ message: 'Erro interno ao deletar usuário' });
    }
});

app.post('/login', async (req, res) => {
    const credentials = req.body;
    try {
        const user = await database.verificarSeTemUsuarioCadastrado(credentials);
        if (user) {
            console.log("Login success");
            res.status(200).send({ success: true, user }); 
        } else {
            console.log("Login failed");
            res.status(400).send({ success: false });
        }
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).send({ message: 'Erro interno ao realizar login' });
    }
});
