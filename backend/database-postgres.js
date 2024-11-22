import { randomUUID } from "crypto";
import { sql } from './db.js';


//MUSICA
export default class DatabasePostgres {
  async listMusicas() {
    return await sql`SELECT * FROM Musicas`;
  }

  async createMusica(musica) {
    const nome_musica = musica.nome_musica;
    const album_musica = musica.album_musica;
    const artista_musica = musica.artista_musica;
    const tempo_duracao = musica.tempo_duracao;

    await sql`INSERT INTO Musicas( nome_musica, album_musica, artista_musica, tempo_duracao) 
              VALUES (${nome_musica}, ${album_musica}, ${artista_musica}, ${tempo_duracao})`;
  }

  async updateMusica(id, musica) {
    const nome_musica = musica.nome_musica;
    const album_musica = musica.album_musica;
    const artista_musica = musica.artista_musica;
    const tempo_duracao = musica.tempo_duracao;

    await sql`UPDATE Musicas SET
      nome_musica = ${nome_musica},
      album_musica = ${album_musica},
      artista_musica = ${artista_musica},
      tempo_duracao = ${tempo_duracao}
      WHERE id_musica = ${id}`;
  }

  async deleteMusica(id) {
    await sql`DELETE FROM Musicas WHERE id_musica = ${id}`;
  }

  // USUARIO
  async verificarSeTemUsuarioCadastrado(credentials) {
    const usuario = await sql`SELECT * FROM Usuarios 
                               WHERE email = ${credentials.email} 
                               AND senha = ${credentials.senha}`;
    return usuario;
  }

  async listUsuarios() {
    return await sql`SELECT * FROM Usuarios`;
  }

  async createUsuarios(usuario) {
    const id = randomUUID();
    const nome = usuario.nome;
    const email = usuario.email;
    const senhaHasheada = usuario.senha;
    const cpf = usuario.cpf;
    const telefone = usuario.telefone;

    await sql`INSERT INTO Usuarios (id_usuario, nome, email, senha, cpf, telefone)
              VALUES (${id}, ${nome}, ${email}, ${senhaHasheada}, ${cpf}, ${telefone})`;
  }

  async updateUsuarios(id, usuario) {
    const nome = usuario.nome;
    const email = usuario.email;
    const senha = usuario.senha; 
    const cpf = usuario.cpf;
    const telefone = usuario.telefone;

    await sql`UPDATE Usuarios SET 
              nome = ${nome},
              email = ${email},
              senha = ${senha},
              cpf = ${cpf},
              telefone = ${telefone}
              WHERE id_usuario = ${id}`;
  }

  async deleteUsuarios(id) {
    await sql`DELETE FROM Usuarios WHERE id_usuario = ${id}`;
  }
}
