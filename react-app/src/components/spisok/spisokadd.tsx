import axios from "axios";
import { useState } from "react";
import "../../css/spisok/spisokadd.css"

interface SpisokAddProps {
    idKanban: number;
}

function SpisokAdd({idKanban}: SpisokAddProps) {
  const [title, settitle] = useState('');
  const [descr, setdescr] = useState('');
  const [error, seterror] = useState('');
  const spisok = {
    name: title,
    description: descr,
  }

  const submitHandler = async function (event: React.FormEvent) {
    seterror("");
    event.preventDefault();
    if(title.length < 4) {
      seterror("Неверные данные!");
      return;
    }
    const response = await axios.post(`http://localhost:8080/spisok/add/${idKanban}`, spisok);
    if(response.data === "") {
      seterror("Список с таким названием уже существует");
      return;
    }
    window.location.reload();
  }

    return (
      <div className="spisokadd">
      <span id="title">
        Новый список
      </span>
      <br/>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Введите название"
          value={title}
          onChange={event => settitle(event.target.value)}
        />
        <br/>
        <textarea
          placeholder="Введите описание"
          value={descr}
          onChange={event => setdescr(event.target.value)}
        />
        <br/>
        <button type="submit">
          Добавить список
        </button>
        <br/>
        <span>{error}</span>
      </form>
      </div>
    );
}

export default SpisokAdd;