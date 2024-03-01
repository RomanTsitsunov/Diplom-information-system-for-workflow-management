import axios from "axios";
import { useState } from "react";
import "../../css/workspace/workspaceredact.css"
import { IWorkspace } from "../../models/workspace";

interface WorkspaceRedactProps {
    workspace: IWorkspace;
}

function WorkspaceRedact({workspace}: WorkspaceRedactProps) {
  const [title, settitle] = useState(workspace.name);
  const [descr, setdescr] = useState(workspace.description);
  const [error, seterror] = useState('');
  const workspaceRedact = {
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
    const idWorkspace = workspace.idWorkspace;
    const response = await axios.post(`http://localhost:8080/workspace/update/${idWorkspace}`, workspaceRedact);
    if(response.data === "") {
      seterror("Рабочее пространство с таким названием уже существует");
      return;
    }
    window.location.reload();
  }

    return (
      <div className="workspaceredact">
      <span id="title">
        Редактирование рабочего пространства
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
          Изменить рабочее пространство
        </button>
        <br/>
        <span>{error}</span>
      </form>
      </div>
    );
}

export default WorkspaceRedact;