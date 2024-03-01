import axios from "axios";
import { useState } from "react";
import "../../css/card/cardredact.css"
import { ICard } from "../../models/card";

interface CardRedactProps {
    card: ICard;
}

function CardRedact({card}: CardRedactProps) {
  const [title, settitle] = useState(card.name);
  const [descr, setdescr] = useState(card.description);
  const [date, setdate] = useState(card.date);
  const [priority, setpriority] = useState(card.priority);
  const [error, seterror] = useState('');
  const cardRedact = {
    name: title,
    description: descr,
    date: date,
    priority: priority
  }

  const submitHandler = async function (event: React.FormEvent) {
    seterror("");
    event.preventDefault();
    if(title.length < 4 || priority < 0 || priority > 9) {
      seterror("Неверные данные!");
      return;
    }
    const idCard = card.idCard;
    const response = await axios.post(`http://localhost:8080/card/update/${idCard}`, cardRedact);
    if(response.data === "") {
      seterror("Карточка с таким названием уже существует");
      return;
    }
    window.location.reload();
  }

    return (
      <div className="cardredact">
      <span id="title">
        Редактирование карточки
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
          placeholder="Введите предельную дату выполнения"
          value={date}
          onChange={event => setdate(event.target.value)}
        />
        <br/>
        <span>
          Введите приоритет (0 - наибольший, 9 - наименьший)
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
          Изменить карточку
        </button>
        <br/>
        <span id="error">
          {error}
        </span>
      </form>
      </div>
    );
}

export default CardRedact;