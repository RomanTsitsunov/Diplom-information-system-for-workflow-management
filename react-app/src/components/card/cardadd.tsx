import axios from "axios";
import { useState } from "react";
import "../../css/card/cardadd.css"

interface CardAddProps {
    idSpisok: number;
}

function CardAdd({idSpisok}: CardAddProps) {
  const [title, settitle] = useState('');
  const [descr, setdescr] = useState('');
  const [date, setdate] = useState('');
  const [priority, setpriority] = useState(0);
  const [error, seterror] = useState('');
  const card = {
    name: title,
    description: descr,
    date: date,
    priority: priority
  }

  const submitHandler = async function (event: React.FormEvent) {
    seterror("");
    event.preventDefault();
    if(title.length < 4) {
      seterror("Неверные данные!");
      return;
    }
    const response = await axios.post(`http://localhost:8080/card/add/${idSpisok}`, card);
    if(response.data === "") {
      seterror("Карточка с таким названием уже существует");
      return;
    }
    window.location.reload();
  }

    return (
      <div className="cardadd">
      <span id="title">
        Новая карточка
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
        <span>
          Введите предельную дату выполнения
        </span>
        <br/>
        <input
          type="date"
          value={date}
          onChange={event => setdate(event.target.value)}
        />
        <br/>
        <span>
          Введите приоритет (0 - наименьший, 9 - наибольший)
        </span>
        <br/>
        <input
          type="number"
          value={priority}
          onChange={event => {
            const number: number = Number.parseInt(event.target.value);
            if(number < 0 || number > 9) {
              seterror("Приоритет должен быть в диапазоне от 0 до 9");
            }
            else {
              seterror("");
            }
            setpriority(number);
          }}
        />
        <br/>
        <button type="submit">
          Добавить карточку
        </button>
        <br/>
        <span id="error">
          {error}
        </span>
      </form>
      </div>
    );
}

export default CardAdd;