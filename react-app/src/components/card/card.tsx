import { ICard } from "../../models/card";
import Mark from "../mark/mark";
import "../../css/card/card.css"
import axios from "axios";
import { useState } from "react";
import Modal from "../modal/modal";
import CardRedact from "./cardredact";
import { Draggable } from "react-beautiful-dnd";
import { IMark } from "../../models/mark";
import useMarkAll from "../../hooks/markall";
import CommentPanel from "./commentpanel";
import { IUsers } from "../../models/users";
import useUserAll from "../../hooks/userall";
import UserCard from "./user_card";

interface CardProps {
  card: ICard,
  index: number
}

function Card({card, index}: CardProps) {
  const marks = useMarkAll();
  const users = useUserAll();
  const [delWarningView, setDelWarningView] = useState(false);
  const [cardRedactIsOpen, setCardRedactIsOpen] = useState(false);
  const [markIsOpen, setMarkIsOpen] = useState(false);
  const [usersIsOpen, setUsersIsOpen] = useState(false);
  const [commentIsOpen, setCommentIsOpen] = useState(false);
  // const [file, setFile] = useState(0);
  // const [url, setUrl] = useState('');
  //const [filterMarks] = useState<IMark[]>(card.marks);
  function redact() {
    if(localStorage.getItem('role') === '1') {
      alert("Нет доступа");
      return;
    }
    setCardRedactIsOpen(true);
  }
  function redactMark() {
    if(localStorage.getItem('role') === '1') {
      alert("Нет доступа");
      return;
    }
    setMarkIsOpen(true);
  }
  function changeMark(mark: IMark) {
    if(card.marks.map(mark => mark.idMark).includes(mark.idMark)) {
      card.marks.splice(card.marks.map(mark => mark.idMark).indexOf(mark.idMark), 1);
    }
    else {
      card.marks.push(mark);
    }
    console.log(card.marks);
  }
  async function closeMark() {
    setMarkIsOpen(false);
    const idCard = card.idCard;
    const response = await axios.post(`http://localhost:8080/card/update/${idCard}`, card);
    console.log(response);
  }
  function redactUsers() {
    if(localStorage.getItem('role') === '1') {
      alert("Нет доступа");
      return;
    }
    setUsersIsOpen(true);
  }
  function changeUser(user: IUsers) {
    if(card.users.map(user => user.idUser).includes(user.idUser)) {
      card.users.splice(card.users.map(user => user.idUser).indexOf(user.idUser), 1);
    }
    else {
      card.users.push(user);
    }
    console.log(card.users);
  }
  async function closeUsers() {
    setUsersIsOpen(false);
    const idCard = card.idCard;
    const response = await axios.post(`http://localhost:8080/card/update/${idCard}`, card);
    console.log(response);
  }
  function del() {
    if(localStorage.getItem('role') === '1') {
      alert("Нет доступа");
      return;
    }
    setDelWarningView(!delWarningView);
  }
  async function confirmDel() {
    const id: number = card.idCard;
    const response = await axios.delete(`http://localhost:8080/card/${id}`);
    console.log(response);
    setDelWarningView(false);
    window.location.reload();
  }
  function comment() {
    setCommentIsOpen(true);
  }

    return (
      <Draggable draggableId={card.idCard.toString()} index={index}>
        {(provided, snapshot) => (
          <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          //style={{backgroundColor: 'green'}}
          //style={{backgroundColor: snapshot.isDragging ? '#b7b6f5' : '#ffffff'}}
          className="card"
          >
            <div id="title">
              {card.name}
            </div>
            <div id="content">
              <div id="desc">
                {card.description}
              </div>
              {/* <input
                style={{marginLeft: 10}}
                type="file"
                onChange={event => console.log(event.target)}
              />
              <br/>
              {file}
              <br/> */}
              <div id="sidePanel">
                <div id="date">
                  Срок карточки: {card.date}
                </div>
                <div id="utils">
                  <button onClick={redact}>Редактировать карточку</button>
                  <br/>
                  <button onClick={redactMark}>Редактировать метки</button>
                  <br/>
                  <button onClick={redactUsers}>Назначить исполнителей</button>
                  <br/>
                  <button onClick={comment}>Комментарии</button>
                  <br/>
                  <button onClick={del}>Удалить карточку</button>
                  <br/>
                  {delWarningView && <><span id="warning">Вы уверены что хотите удалить карточку?</span>
                  <br/>
                  <button style={{height: 24}} onClick={confirmDel}>Да</button>
                  <button style={{height: 24}} onClick={del}>Нет</button></>}
                </div>
              </div>
            </div>
            <div id="priority">
              Приоритет: {card.priority}
            </div>
            <div id="comment">
              Комментариев: {card.comments.length}
            </div>
            <div id="users">
              Исполнители:
              <br/>
              { card.users.map(user => <UserCard user={user} key={user.idUser} />)}
            </div>
            <div id="marks">
              Метки:
              <br/>
              { card.marks.map(mark => <Mark mark={mark} key={mark.idMark} />)}
            </div>
            {/* <input
              type="text"
              placeholder="Введите url"
              value={url}
              onChange={event => setUrl(event.target.value)}
            />
            <br/> */}
            {/* <img src={url} alt={url}/> */}
            <Modal open={cardRedactIsOpen}>
              <CardRedact card={card}/>
              <br/>
              <button id="modalButton" onClick={() => setCardRedactIsOpen(false)}>Закрыть</button>
            </Modal>
            <Modal open={markIsOpen}>
              { marks.map(mark => 
                <div key={mark.idMark}>
                  <input onClick={() => changeMark(mark)} type="checkbox"
                  defaultChecked={card.marks.map(mark => mark.idMark).includes(mark.idMark)}
                  name="mark"/>
                  <span style={{color: mark.color === null ? "black": mark.color}}>
                    {mark.name}
                  </span>
                </div>)}
              <br/>
              <button id="modalButton" onClick={closeMark}>Закрыть</button>
            </Modal>
            <Modal open={usersIsOpen}>
              { users.map(user => 
                <div key={user.idUser}>
                  <input onClick={() => changeUser(user)} type="checkbox"
                  defaultChecked={card.users.map(user => user.idUser).includes(user.idUser)}
                  name="user"/>
                  <span>
                    {user.login} {user.email}
                  </span>
                </div>)}
              <br/>
              <button id="modalButton" onClick={closeUsers}>Закрыть</button>
            </Modal>
            <Modal open={commentIsOpen}>
              <CommentPanel card={card}/>
              <br/>
              <button id="modalButton" onClick={() => setCommentIsOpen(false)}>Закрыть</button>
            </Modal>
          </div>
        )}
      </Draggable>
    );
  }
  
  export default Card;