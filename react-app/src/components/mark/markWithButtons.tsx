import { useState } from "react";
import { IMark } from "../../models/mark";
import axios from "axios";
import Modal2 from "../modal/modal2";
import MarkRedact from "./markredact";

interface MarkProps {
    mark: IMark
}

function MarkWithButtons({mark}: MarkProps) {
  const [markRedactIsOpen, setmarkRedactIsOpen] = useState(false);
  const [delWarningView, setDelWarningView] = useState(false);

  function redactMark() {
      setDelWarningView(false);
      setmarkRedactIsOpen(true);
  }
  function delMark() {
      setDelWarningView(!delWarningView);
  }
  async function confirmDel() {
      const id: number = mark.idMark;
      const response = await axios.delete(`http://localhost:8080/mark/${id}`);
      console.log(response);
      setDelWarningView(false);
      window.location.reload();
    }
    
    return (
        <div>
          <span style={{color: mark.color === null ? "black": mark.color}}>
            {mark.name}
          </span>
          <br/>
          <button onClick={redactMark}>Редактировать</button>
          <button onClick={delMark}>Удалить</button>
          <br/>
          {delWarningView && <><span id="warning">Вы уверены что хотите удалить метку?</span>
          <br/>
          <button onClick={confirmDel}>Да</button>
          <button onClick={delMark}>Нет</button></>}
          <Modal2 open={markRedactIsOpen}>
            <MarkRedact mark={mark}/>
            <br/>
            <button id="modalButton" onClick={() => setmarkRedactIsOpen(false)}>Закрыть</button>
          </Modal2>
        </div>
    );
}

export default MarkWithButtons;