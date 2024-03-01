import axios from "axios";
import { ICard } from "../../models/card";
import { useState } from "react";
import "../../css/card/commentpanel.css"
import Comment from "./comment";


interface CommentProps {
    card: ICard;
}

function CommentPanel({card}: CommentProps) {
  const [text, setText] = useState('');
  const [error, seterror] = useState('');
  const comment = {
    text: text,
  }

  const submitHandler = async function (event: React.FormEvent) {
    seterror("");
    event.preventDefault();
    const idCard = card.idCard;
    const idUser = localStorage.getItem("idUser");
    const response = await axios.post(`http://localhost:8080/comment/add/${idCard}/${idUser}`, comment);
    if(response.data === "") {
      seterror("Ошибка добавления комментария");
      return;
    }
    window.location.reload();
  }

    return (
      <div className="commentpanel">
      <span id="title">
        {card.name}
      </span>
      <br/>
      <span id="desc">
        {card.description}
      </span>
      <br/>
      <form onSubmit={submitHandler}>
        <textarea
          placeholder="Введите комментарий"
          value={text}
          onChange={event => setText(event.target.value)}
        />
        <br/>
        <button type="submit">
          Оставить комментарий
        </button>
        <br/>
        <span>{error}</span>
      </form>
      { card.comments.map(comment => <Comment comment={comment} key={comment.idComment} />)}
      </div>
    );
}

export default CommentPanel;