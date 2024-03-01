import axios from "axios";
import { compare } from "bcrypt-ts";
import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../css/login.module.css"

function Login() {  
  const [login, setlogin] = useState('');
  const [pass, setpass] = useState('');
  const [error, seterror] = useState('');
  const [isAuthenticated, setAuth] = useState('false');
  localStorage.setItem('isAuthenticated', isAuthenticated);

  const submitHandler = async function (event: React.FormEvent) {
    seterror("");
    event.preventDefault();
    if(login === '' || pass === '') {
      seterror("Введите логин и пароль");
      return;
    }
    const response = await axios.get(`http://localhost:8080/user/login/${login}`);
    const user = response.data;
    if(user === '') {
      seterror("Не найден пользователь с таким логином");
      return;
    }
    const comparepass = await compare(pass, user.pass);
    if(!comparepass) {
      seterror("Неверный пароль");
      return;
    }
    else {
      const id: number = user.idUser;
      setAuth('true');
      localStorage.setItem('isAuthenticated', isAuthenticated);
      localStorage.setItem('idUser', id.toString());
      localStorage.setItem('role', user.role.levelAccess);
      window.location.assign(`http://localhost:3000/main/${id}`);
    }
  }

    return (
      <div className={styles.login}>
        <span>
          Вход в систему
        </span>
        <br/>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Введите логин"
            value={login}
            onChange={event => setlogin(event.target.value)}
          />
          <br/>
          <input
            type="password"
            placeholder="Введите пароль"
            value={pass}
            onChange={event => setpass(event.target.value)}
          />
          <br/>
          <button type="submit">
            Войти
          </button>
          <br/>
          {error}
        </form>
        <br/>
        <Link to="registration">Зарегистрироваться</Link>
      </div>
    );
  }
  
  export default Login;