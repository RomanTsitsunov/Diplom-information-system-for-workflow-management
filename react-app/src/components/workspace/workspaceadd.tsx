import axios from "axios";
import { useState } from "react";
import "../../css/workspace/workspaceadd.css"

interface WorkspaceAddProps {
  idUser: number;
}

function WorkspaceAdd({idUser}: WorkspaceAddProps) {
  const [title, settitle] = useState('');
  const [descr, setdescr] = useState('');
  const [error, seterror] = useState('');
  const workspace = {
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
    const response = await axios.post(`http://localhost:8080/workspace/add/${idUser}`, workspace);
    if(response.data === "") {
      seterror("Рабочее пространство с таким названием уже существует");
      return;
    }
    window.location.reload();
  }

    return (
      <div className="workspaceadd">
      <span id="title">
        Новое рабочее пространство
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
          Добавить рабочее пространство
        </button>
        <br/>
        <span>{error}</span>
      </form>
      </div>
    );
}

export default WorkspaceAdd;