import { ISpisok } from "../../models/spisok";
import Card from "../card/card";
import "../../css/spisok/spisok.css"
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../modal/modal";
import SpisokRedact from "./spisokredact";
import CardAdd from "../card/cardadd";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ICard } from "../../models/card";
import { IMark } from "../../models/mark";
import { useFilter } from "../../hooks/filter";
import { IUsers } from "../../models/users";

interface SpisokProps {
  spisok: ISpisok,
  indexSpisoks: number,
  filterMarks: IMark[],
  filterByCurrentUser: boolean,
  user: IUsers,
}

function Spisok({spisok, indexSpisoks, filterMarks, filterByCurrentUser, user}: SpisokProps) {
  const cardsFilterMark: ICard[] = useFilter({spisok, filterMarks});
  const cards: ICard[] = filterMarks.length === 0 ? spisok.cards: cardsFilterMark;
  const cardsFilterUser: ICard[] = filterByCurrentUser ? cards.filter(card => {
    return card.users.map(user => user.idUser).includes(user.idUser);
  }
  ): cards;
  //const [cardsstate, setCardsstate] = useState(cards);
  const [delWarningView, setDelWarningView] = useState(false);
  const [spisokRedactIsOpen, setspisokRedactIsOpen] = useState(false);
  const [cardAddIsOpen, setcardAddIsOpen] = useState(false);
  function redact() {
    if(localStorage.getItem('role') === '1') {
      alert("Нет доступа");
      return;
    }
    setspisokRedactIsOpen(true);
  }
  function del() {
    if(localStorage.getItem('role') === '1') {
      alert("Нет доступа");
      return;
    }
    setDelWarningView(!delWarningView);
  }
  async function confirmDel() {
    const id: number = spisok.idSpisok;
    const response = await axios.delete(`http://localhost:8080/spisok/${id}`);
    console.log(response);
    setDelWarningView(false);
    window.location.reload();
  }
  function createCard() {
    if(localStorage.getItem('role') === '1') {
      alert("Нет доступа");
      return;
    }
    setcardAddIsOpen(true);
  }
  // function sort() {
  //   // const c = spisok.cards[0];
  //   // spisok.cards.splice(0, 1);
  //   // spisok.cards.splice(1, 0, c);

  //   //cards = cards.reverse();

  //   //setCardsstate(cards.sort((a, b) => a.priority - b.priority));
  //   //console.log(cardsstate);
  // }
  
    return (
      <Draggable draggableId={spisok.idSpisok.toString()} index={indexSpisoks}>
        {(provided) => (
          <div 
            {...provided.draggableProps}
            ref={provided.innerRef}
            //style={{backgroundColor: 'blue'}}
            className="spisok"
          >
            <span {...provided.dragHandleProps} id="title">
              {spisok.name}
            </span>
            {/* <button id="sort" onClick={sort}>Отсортировать карточки по приоритетам</button> */}
            <br/>
            <span id="desc">
              {spisok.description}
            </span>
            <Modal open={spisokRedactIsOpen}>
              <SpisokRedact spisok={spisok}/>
              <br/>
              <button id="modalButton" onClick={() => setspisokRedactIsOpen(false)}>Закрыть</button>
            </Modal>
            <Modal open={cardAddIsOpen}>
              <CardAdd idSpisok={spisok.idSpisok}/>
              <br/>
              <button id="modalButton" onClick={() => setcardAddIsOpen(false)}>Закрыть</button>
            </Modal>
            <br/>
            <button onClick={redact}>Редактировать колонку</button>
            <br/>
            <button onClick={createCard}>Добавить карточку</button>
            <br/>
            <button onClick={del}>Удалить колонку</button>
            <br/>
            {delWarningView && <><span id="warning">Вы уверены что хотите удалить колонку?</span>
                <br/>
                <button onClick={confirmDel}>Да</button>
                <button onClick={del}>Нет</button></>}
            {/* {spisok.cards.filter(card => card.marks.includes(card.marks[0]))
            .map(card => <Card card={card} key={card.idCard} />)} */}
            <Droppable droppableId={indexSpisoks.toString()} type="card">
              {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  transition: 'backgroundColor 0.2s ease',
                  backgroundColor: snapshot.isDraggingOver ? 'skyblue' : '#ffffff'}}
              >
                {cardsFilterUser.map((card, index) => <Card card={card} index={index} key={card.idCard} />)}
                {provided.placeholder}
              </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    );
  }
  
  export default Spisok;