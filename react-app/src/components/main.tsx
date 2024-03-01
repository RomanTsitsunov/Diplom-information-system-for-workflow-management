import { useState } from "react";
import { Link } from "react-router-dom";
import Workspace from "./workspace/workspace";
import { useMain } from "../hooks/main";
import "../css/main.css"
import WorkspaceAdd from "./workspace/workspaceadd";
import Modal from "./modal/modal";

//function Main(id: number)
function Main() {
  const {idUser, workspaces} = useMain();
  // const [title, setTitle] = useState('');
  // const [description, setDescription] = useState('');
  const [workspaceAddIsOpen, setworkspaceAddIsOpen] = useState(false);
  function createWorkspace() {
    if(localStorage.getItem('role') !== '3') {
      alert("Нет доступа");
      return;
    }
    setworkspaceAddIsOpen(true);
  }

    return (
      <div className="main">
        {/* { workspaces.filter((workspace) => 
        workspace.name.includes(title) && workspace.description.includes(description))
        .map((workspace) => <Workspace workspace={workspace} key={workspace.idWorkspace} />)} */}
        { workspaces.map((workspace) => <Workspace workspace={workspace} key={workspace.idWorkspace} />)}
        <button id="add" onClick={createWorkspace}>Создать новое рабочее пространство</button>
        <Modal open={workspaceAddIsOpen}>
          <WorkspaceAdd idUser={idUser}/>
          <br/>
          <button id="modalButton" onClick={() => setworkspaceAddIsOpen(false)}>Закрыть</button>
        </Modal>
        <br/>
        {/* <input
          type="text"
          placeholder="Поиск по названию"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <br/>
        <input
          type="text"
          placeholder="Поиск по описанию"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <br/> */}
        <Link
          to="/"
        >Выйти из системы</Link>
      </div>
    );
  }
  export default Main;