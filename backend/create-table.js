import { sql } from './db.js'

sql`
    CREATE TABLE Usuarios(
      id_usuario text PRIMARY KEY,
      nome character varying(255),
      email character varying(255),
      senha character varying(255),
      cpf character varying(15),
      telefone character varying(255)
  );

    CREATE TABLE Musicas(
        id_musica SERIAL PRIMARY KEY NOT NULL,
        nome_musica VARCHAR(255) NOT NULL,
        album_musica VARCHAR(255) NOT NULL,
        artista_musica VARCHAR(255) NOT NULL,
        tempo_duracao VARCHAR(5) NOT NULL
    );
`
.then(() =>{
    console.log("tabela criada");
})