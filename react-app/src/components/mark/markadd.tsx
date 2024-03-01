import axios from "axios";
import { useState } from "react";
import "../../css/mark/markadd.css"

function MarkAdd() {
  const [name, setname] = useState('');
  const [color, setcolor] = useState('');
  const [error, seterror] = useState('');
  const mark = {
    name: name,
    color: {
        color: color,
    },
  }

  const submitHandler = async function (event: React.FormEvent) {
    seterror("");
    event.preventDefault();
    if(name.length < 4) {
      seterror("Неверные данные!");
      return;
    }
    const response = await axios.post(`http://localhost:8080/mark/add`, mark);
    if(response.data === "") {
      seterror("Метка с таким названием уже существует");
      return;
    }
    window.location.reload();
  }

    return (
      <div className="markadd">
      <span id="title">
        Новая метка
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
          Добавить метку
        </button>
        <br/>
        <span>{error}</span>
      </form>
      </div>
    );
}

export default MarkAdd;