import axios from "axios";
import { useState } from "react";
import "../../css/kanban/kanbanredact.css"
import { IKanban } from "../../models/kanban";

interface KanbanRedactProps {
    kanban: IKanban;
}

function KanbanRedact({kanban}: KanbanRedactProps) {
  const [title, settitle] = useState(kanban.name);
  const [descr, setdescr] = useState(kanban.description);
  const [error, seterror] = useState('');
  const kanbanRedact = {
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
    const idKanban = kanban.idKanban;
    const response = await axios.post(`http://localhost:8080/kanban/update/${idKanban}`, kanbanRedact);
    if(response.data === "") {
      seterror("Доска с таким названием уже существует");
      return;
    }
    window.location.reload();
  }

    return (
      <div className="kanbanredact">
      <span id="title">
        Редактирование доски
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
          Изменить доску
        </button>
        <br/>
        <span>{error}</span>
      </form>
      </div>
    );
}

export default KanbanRedact;