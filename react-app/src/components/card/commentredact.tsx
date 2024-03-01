import { useState } from "react";
import { IComment } from "../../models/comment";
import axios from "axios";
import "../../css/card/commentredact.css"

interface CommentRedactProps {
  comment: IComment;
}

function CommentRedact({comment}: CommentRedactProps) {
  const [text, setText] = useState(comment.text);
  //const [descr, setdescr] = useState(comment.description);
  //const [date, setdate] = useState(comment.date);
  const [error, seterror] = useState('');
  const commentRedact = {
    text: text,
  }

  const submitHandler = async function (event: React.FormEvent) {
    seterror("");
    event.preventDefault();
    const idComment = comment.idComment;
    const response = await axios.post(`http://localhost:8080/comment/update/${idComment}`, commentRedact);
    if(response.data === "") {
      seterror("Ошибка редактирования комментария");
      return;
    }
    window.location.reload();
  }

    return (
      <div className="commentredact">
        <span id="title">
          Редактирование комментария
        </span>
        <br/>
        <form onSubmit={submitHandler}>
          <textarea
            placeholder="Введите описание"
            value={text}
            onChange={event => setText(event.target.value)}
          />
          <br/>
          <button type="submit">
            Изменить комментарий
          </button>
          <br/>
          <span>{error}</span>
        </form>
      </div>
    );
}

export default CommentRedact;