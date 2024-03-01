import axios from "axios";
import { useState } from "react";
import "../../css/spisok/spisokredact.css"
import { ISpisok } from "../../models/spisok";

interface SpisokRedactProps {
    spisok: ISpisok;
}

function SpisokRedact({spisok}: SpisokRedactProps) {
  const [title, settitle] = useState(spisok.name);
  const [descr, setdescr] = useState(spisok.description);
  const [error, seterror] = useState('');
  const spisokRedact = {
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
    const idSpisok = spisok.idSpisok;
    const response = await axios.post(`http://localhost:8080/spisok/update/${idSpisok}`, spisokRedact);
    if(response.data === "") {
      seterror("Список с таким названием уже существует");
      return;
    }
    window.location.reload();
  }

    return (
      <div className="spisokredact">
      <span id="title">
        Редактирование списка
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
          Изменить список
        </button>
        <br/>
        <span>{error}</span>
      </form>
      </div>
    );
}

export default SpisokRedact;