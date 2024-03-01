import axios from "axios";
import { useState } from "react";
import "../../css/kanban/kanbanadd.css"

interface KanbanAddProps {
    idWorkspace: number;
}

function KanbanAdd({idWorkspace}: KanbanAddProps) {
  const [title, settitle] = useState('');
  const [descr, setdescr] = useState('');
  const [error, seterror] = useState('');
  const kanban = {
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
    const response = await axios.post(`http://localhost:8080/kanban/add/${idWorkspace}`, kanban);
    if(response.data === "") {
      seterror("Доска с таким названием уже существует");
      return;
    }
    window.location.reload();
  }

    return (
      <div className="kanbanadd">
      <span id="title">
        Новая доска
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
          Добавить доску
        </button>
        <br/>
        <span>{error}</span>
      </form>
      </div>
    );
}

export default KanbanAdd;