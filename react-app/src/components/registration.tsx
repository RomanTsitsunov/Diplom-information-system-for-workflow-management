import axios from "axios";
import { hash } from "bcrypt-ts";
import { useState } from "react";
import "../css/registration.css"
import { Link } from "react-router-dom";

function Registration() {
  const [login, setlogin] = useState('');
  const [name, setname] = useState('');
  const [surname, setsurname] = useState('');
  const [otchestvo, setotchestvo] = useState('');
  const [phone, setphone] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [error, seterror] = useState('');
  const user = {
    login: login,
    name: name,
    surname: surname,
    otchestvo: otchestvo,
    phone: phone,
    email: email,
    pass: pass,
    role: {
      idRole: 1,
      name: 'junior developer',
      levelAccess: 1,
    }
  }

  const submitHandler = async function (event: React.FormEvent) {
    seterror("");
    event.preventDefault();
    if(pass.length < 4 || login.length < 4 || email.indexOf("@") === -1
    || name.length < 4 || surname.length < 4 || otchestvo.length < 4 || phone.length < 8) {
      seterror("Неверные данные!");
      return;
    }
    const hashpass = await hash(pass, 5);
    user.pass = hashpass;
    const response = await axios.post(`http://localhost:8080/user`, user);
    if(response.data === "") {
      seterror("Пользователь с таким логином или почтой уже существует");
      return;
    }
    window.location.assign('http://localhost:3000');
  }

  return (
    <div className="registration">
      <span id="title">
        Регистрация
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
          type="text"
          placeholder="Введите имя"
          value={name}
          onChange={event => setname(event.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Введите фамилию"
          value={surname}
          onChange={event => setsurname(event.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Введите отчество"
          value={otchestvo}
          onChange={event => setotchestvo(event.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Введите номер телефона"
          value={phone}
          onChange={event => setphone(event.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Введите почту"
          value={email}
          onChange={event => setemail(event.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Введите пароль"
          value={pass}
          onChange={event => setpass(event.target.value)}
        />
        <br/>
        <button type="submit">
          Зарегистрироваться
        </button>
        <br/>
        <span>{error}</span>
      </form>
      <br/>
      <Link to="/">На главную</Link>
    </div>
  );
  }
  
  export default Registration;