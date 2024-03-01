import { useMemo, useState } from "react";
import { IKanban } from "../../models/kanban";
import axios from "axios";
import "../../css/kanban/kanban.css"
import Modal from "../modal/modal";
import KanbanRedact from "./kanbanredact";
import { Link } from "react-router-dom";

interface KanbanProps {
  kanban: IKanban;
}

function Kanban({kanban}: KanbanProps) {
  /*const [spisok, setspisok] = useState([{}]);
  const kan = async function (id: number) {
    
    const kanban = await axios.get(`http://localhost:3000/kanban/${id}`): IKanban;
    setspisok(kanban.spisok);
    
  }*/
  const [delWarningView, setDelWarningView] = useState(false);
  const [kanbanRedactIsOpen, setkanbanRedactIsOpen] = useState(false);
  function redact() {
    if(localStorage.getItem('role') !== '4') {
      alert("Нет доступа");
      return;
    }
    setkanbanRedactIsOpen(true);
  }
  function del() {
    if(localStorage.getItem('role') !== '4') {
      alert("Нет доступа");
      return;
    }
    setDelWarningView(!delWarningView);
  }
  async function confirmDel() {
    const id: number = kanban.idKanban;
    const response = await axios.delete(`http://localhost:8080/kanban/${id}`);
    console.log(response);
    setDelWarningView(false);
    window.location.reload();
  }

  const idKanban: number = useMemo(() => kanban.idKanban, [kanban.idKanban]);
  const idUser = useMemo(() => localStorage.getItem('idUser'), []);

    return (
      <div className="kanban">
        <span id="title">
          {kanban.name}
        </span>
        <br/>
        <span id="desc">
          {kanban.description}
        </span>
        <Modal open={kanbanRedactIsOpen}>
          <KanbanRedact kanban={kanban}/>
          <br/>
          <button id="modalButton" onClick={() => setkanbanRedactIsOpen(false)}>Закрыть</button>
        </Modal>
        <br/>
        <button><Link id="link" to={`http://localhost:3000/${idUser}/kanban/${idKanban}`}>Открыть доску</Link></button>
        <br/>
        <button onClick={redact}>Редактировать</button>
        <br/>
        <button onClick={del}>Удалить</button>
        <br/>
        {delWarningView && <><span id="warning">Вы уверены что хотите удалить доску?</span>
            <br/>
            <button onClick={confirmDel}>Да</button>
            <button onClick={del}>Нет</button></>}
      </div>
    );
  }
  
  export default Kanban;