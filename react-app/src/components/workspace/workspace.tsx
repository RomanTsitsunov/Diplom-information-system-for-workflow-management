import { useState } from "react";
import { IWorkspace } from "../../models/workspace";
import { IKanban } from "../../models/kanban";
import Kanban from "../kanban/kanban";
import "../../css/workspace/workspace.css"
import axios from "axios";
import WorkspaceRedact from "./workspaceredact";
import Modal from "../modal/modal";
import KanbanAdd from "../kanban/kanbanadd";

interface WorkspaceProps {
    workspace: IWorkspace;
}

function Workspace({workspace}: WorkspaceProps) {
  const [kanbanview, setkanbanview] = useState(false);
  const [delWarningView, setDelWarningView] = useState(false);
  const [workspaceRedactIsOpen, setworkspaceRedactIsOpen] = useState(false);
  const [kanbanAddIsOpen, setkanbanAddIsOpen] = useState(false);
  const kanbans: IKanban[] = workspace.kanbans;
  //const [kanbans, setkanbans] = useState<IKanban[]>([]);
  //console.log(workspace);
  function kanban() {
    setkanbanview(!kanbanview);
    //setkanbans(workspace.kanbans);
  }
  function redact() {
    if(localStorage.getItem('role') !== '3') {
      alert("Нет доступа");
      return;
    }
    setworkspaceRedactIsOpen(true);
  }
  function del() {
    if(localStorage.getItem('role') !== '3') {
      alert("Нет доступа");
      return;
    }
    setDelWarningView(!delWarningView);
  }
  async function confirmDel() {
    const id: number = workspace.idWorkspace;
    const response = await axios.delete(`http://localhost:8080/workspace/${id}`);
    console.log(response);
    setDelWarningView(false);
    window.location.reload();
  }
  function createKanban() {
    if(localStorage.getItem('role') !== '3') {
      alert("Нет доступа");
      return;
    }
    setkanbanAddIsOpen(true);
  }

    return (
      <div className="workspace">
        <span id="title">
          {workspace.name}
        </span>
        <br/>
        <span id="desc">
          {workspace.description}
        </span>
        <br/>
        <button onClick={redact}>Редактировать</button>
        <Modal open={workspaceRedactIsOpen}>
          <WorkspaceRedact workspace={workspace}/>
          <br/>
          <button id="modalButton" onClick={() => setworkspaceRedactIsOpen(false)}>Закрыть</button>
        </Modal>
        <Modal open={kanbanAddIsOpen}>
          <KanbanAdd idWorkspace={workspace.idWorkspace}/>
          <br/>
          <button id="modalButton" onClick={() => setkanbanAddIsOpen(false)}>Закрыть</button>
        </Modal>
        <br/>
        <button onClick={del}>Удалить</button>
        <br/>
        {delWarningView && <><span id="warning">Вы уверены что хотите удалить рабочее пространство?</span>
            <br/>
            <button onClick={confirmDel}>Да</button>
            <button onClick={del}>Нет</button></>}
        <button onClick={createKanban}>Добавить доску</button>
        <br/>
        <button onClick={kanban}>{kanbanview ? "Скрыть доски": "Просмотреть доски"}</button>
        <br/>
        {kanbanview && /*{localStorage.getItem('role') === 'admin' &&}*/ kanbans.map(kanban => <Kanban kanban={kanban} key={kanban.idKanban} />)}
        <br/>
      </div>
    );
  }
  
  export default Workspace;