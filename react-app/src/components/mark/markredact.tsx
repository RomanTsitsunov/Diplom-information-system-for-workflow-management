import axios from "axios";
import { useState } from "react";
import { IMark } from "../../models/mark";
import "../../css/mark/markredact.css"

interface MarkRedactProps {
    mark: IMark;
}

function MarkRedact({mark}: MarkRedactProps) {
  // if(mark === undefined) {
  //   mark = {
  //       idMark: 0,
  //       name: "",
  //       color: {
  //           idColor: 0,
  //           color: '',
  //       },
  //     }
  // }
  const [name, setname] = useState(mark.name);
  const [color, setcolor] = useState(mark.color);
  const [error, seterror] = useState('');
  
  const markRedact = {
    name: name,
    color: color
  }
  //console.log(markRedact);
  const submitHandler = async function (event: React.FormEvent) {
    seterror("");
    event.preventDefault();
    if(name.length < 4) {
      seterror("Неверные данные!");
      return;
    }
    const idMark = mark.idMark;
    const response = await axios.post(`http://localhost:8080/mark/update/${idMark}`, markRedact);
    if(response.data === "") {
      seterror("Метка с таким названием уже существует");
      return;
    }
    window.location.reload();
  }

    return (
      <div className="markredact">
      <span id="title">
        Редактирование метки
      </span>
      <br/>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Введите название"
          value={name}
          onChange={event => setname(event.target.value)}
        />
        <br/>
        <span>
          Укажите цвет метки
        </span>
        <br/>
        <input
          type="color"
          value={color}
          onChange={event => setcolor(event.target.value)}
        />
        <br/>
        <button type="submit">
          Изменить метку
        </button>
        <br/>
        <span>{error}</span>
      </form>
      </div>
    );
}

export default MarkRedact;