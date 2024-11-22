import { useState, useEffect, useRef } from 'react';
import { FaXmark } from "react-icons/fa6";
import axios from "axios";
import { FaPen } from "react-icons/fa";
import '../css/home.css';

function Home() {
  const [idMusica, setIdMusica] = useState('');
  const [nomeMusica, setNomeMusica] = useState('');
  const [albumMusica, setAlbumMusica] = useState('');
  const [artistaMusica, setArtistaMusica] = useState('');
  const [duracaoMusica, setDuracaoMusica] = useState('');
  const [loading, setLoading] = useState(false);
  const [musicas, setMusicas] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const nomeInputRef = useRef(null);

  const fetchMusicas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/musicas`);
      setMusicas(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMusicas();
  }, []);

  const adicionarMusica = async () => {
    try {
      await axios.post(`http://localhost:8080/musicas`, {
        nome_musica: nomeMusica,
        album_musica: albumMusica,
        artista_musica: artistaMusica,
        tempo_duracao: duracaoMusica,
      });
      fetchMusicas();
      setNomeMusica('');
      setAlbumMusica('');
      setArtistaMusica('');
      setDuracaoMusica('');
    } catch (error) {
      console.error('Erro ao adicionar música:', error);
    }
  };

  const deletarMusica = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/musicas/${id}`);
      fetchMusicas();
    } catch (erro) {
      console.error("Erro ao deletar música:", erro);
    }
  };

  const preencherMusica = (musica) => {
    setIsEdit(true);
    setIdMusica(musica.id_musica);
    setNomeMusica(musica.nome_musica);
    setAlbumMusica(musica.album_musica);
    setArtistaMusica(musica.artista_musica);
    setDuracaoMusica(musica.tempo_duracao);

    setTimeout(() => {
      nomeInputRef.current.focus();
    }, 0);
  };

  const editarMusica = async () => {
    try {
      await axios.put(`http://localhost:8080/musicas/${idMusica}`, {
        nome_musica: nomeMusica,
        album_musica: albumMusica,
        artista_musica: artistaMusica,
        tempo_duracao: duracaoMusica,
      });
      setIdMusica('');
      setNomeMusica('');
      setAlbumMusica('');
      setArtistaMusica('');
      setDuracaoMusica('');
      setIsEdit(false);
      fetchMusicas();
    } catch (erro) {
      console.error("Erro ao editar música: ", erro);
    }
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>CRUD Tarefas</h1>
      </div>
      <div className="icon-container">
      </div>
      <div className="form-container">
        <input
          type="text"
          name="nome"
          ref={nomeInputRef}
          value={nomeMusica}
          onChange={(e) => setNomeMusica(e.target.value)}
          placeholder="Nome da Música"
        />
        <input
          type="text"
          name="album"
          value={albumMusica}
          onChange={(e) => setAlbumMusica(e.target.value)}
          placeholder="Álbum"
        />
        <input
          type="text"
          name="artista"
          value={artistaMusica}
          onChange={(e) => setArtistaMusica(e.target.value)}
          placeholder="Artista"
        />
        <input
          type="text"
          id="duracao"
          name="duracao"
          value={duracaoMusica}
          maxLength="5"
          placeholder="Tempo de Duração"
          onChange={(e) => setDuracaoMusica(e.target.value)}
        />
        {isEdit ? (
          <button onClick={editarMusica}>Editar Música</button>
        ) : (
          <button onClick={adicionarMusica}>Adicionar Música</button>
        )}
      </div>
      <h2>Minhas Músicas</h2>
      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <div className="music-list">
          {musicas.map((musica) => (
            <div key={musica.id_musica} className="music-item">
              <FaXmark onClick={() => deletarMusica(musica.id_musica)} className="delete-icon" />
              <FaPen onClick={() => preencherMusica(musica)} className="edit-icon" />
              <div className="music-info">
                <p>Nome da música: {musica.nome_musica}</p>
                <p>Album da musica: {musica.album_musica}</p>
                <p>Artista: {musica.artista_musica}</p>
                <p>Duração: {musica.tempo_duracao}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
