import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/login_cadastro.css';

const logar = async (email, senha) => {
  try {
    const response = await axios.post('http://localhost:3333/login', {
      email: email,
      senha: senha,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if( !email || !senha){
      alert("Preencha todos os campos")
      return
    }
    try {
      const response = await logar(email, senha);
      console.log("Login certo", response)
      if (response.success == true) {
        localStorage.setItem("dados usuario",  JSON.stringify(response.user))
        navigate('/')
      }
      else {
        alert("Email ou senha incorretos")
      }
    }
    catch (error) {
      console.error('Erro ao se logar:', error);
    }
  };

  return (
    <>
      <div className='login-container'>
        <div className='tCadastro'>
          <h1>Login</h1>
        </div>
          <input
            placeholder='Email'
            required
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input-login'
          />
        <br />
          <input
            placeholder='Senha'
            type="password"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className='input-login '
          />
        <button className="botao-login" onClick={handleLogin}>
          Login
        </button>
        <a href='/cadastro'>Não possui conta? Cadastre-se</a>
      </div>
    </>
  );
}

export default Login;