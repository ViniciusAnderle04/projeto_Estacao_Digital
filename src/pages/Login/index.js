import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom"; // Use "useNavigate" em vez de "Navigate"
import arrowImg from "../../assets/arrow.svg";
import { auth } from "../../services/firebaseConfig";


import "./login.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use "useNavigate" para obter a função de redirecionamento

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password).then(() => {
      // Redirecione após o login bem-sucedido
    });
  }

  if (loading) {    console.log(auth.currentUser.email);

    return <p>carregando...</p>;
  }

  if (user) {
    console.log(auth.currentUser.email);
    navigate("/");

    // Não é necessário retornar nada aqui, o redirecionamento será executado no handleSignIn.
    return null;
  }

  return (
    <div className="cont">
      <header className="">
        <h2>Por favor, digite suas informações de login</h2>
      </header>

      <form>
        <div className="inputcont">
          <label htmlFor="email">E-mail</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputcont">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="********************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="button" onClick={handleSignIn}>
          Entrar <img src={arrowImg} alt="->" />
        </button>
        <div className="footer">
          <p>Você não tem uma conta?</p>
          <Link to="/register">Crie a sua conta aqui</Link>
        </div>
      </form>
    </div>
  );
}
