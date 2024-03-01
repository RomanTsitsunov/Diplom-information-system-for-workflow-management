import Spisok from "./spisok/spisok";
import { useCurrentKanban } from "../hooks/currentkanban";
import "../css/currentkanban.css"
import { useState } from "react";
import Modal from "./modal/modal";
import SpisokAdd from "./spisok/spisokadd";
import MarkAll from "./mark/markall";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { ISpisok } from "../models/spisok";
import { ICard } from "../models/card";
import useMarkAll from "../hooks/markall";
import { IMark } from "../models/mark";
import axios from "axios";

//function Kanban(id: number)
function CurrentKanban() {
  const {kanban, spisoks, user} = useCurrentKanban();
  const marks = useMarkAll();
  //const user = useCurrentUser({idUser});
  //const [user, setUser] = useState(useCurrentUser({idUser}));
  const [spisokAddIsOpen, setspisokAddIsOpen] = useState(false);
  const [marksIsOpen, setMarksIsOpen] = useState(false);
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [filterByCurrentUser, setFilterByCurrentUser] = useState(false);
  const [filterMarks] = useState<IMark[]>([]);
  function createSpisok() {
    if(localStorage.getItem('role') === '1') {
      alert("Нет доступа");
      return;
    }
    setspisokAddIsOpen(true);
  }
  function mark() {
    if(localStorage.getItem('role') === '1') {
      alert("Нет доступа");
      return;
    }
    setMarksIsOpen(true);
  }
  function filter() {
    setFilterIsOpen(true);
  }
  function addFilter(mark: IMark) {
    if(filterMarks.includes(mark)) {
      filterMarks.splice(filterMarks.indexOf(mark), 1);
    }
    else {
      filterMarks.push(mark);
    }
  }
  function sort() {
    window.location.reload();
  }
  function sortUser() {
    setFilterByCurrentUser(!filterByCurrentUser);
  }

  async function onDragEnd(result: any) {
    const { destination, source, type } = result;
    if(!destination) {
      return;
    }
    if(destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    if(type === "spisok") {
      const spisok: ISpisok = spisoks[source.index];
      spisoks.splice(source.index, 1);
      spisoks.splice(destination.index, 0, spisok);
      return;
    }
    if(destination.droppableId === source.droppableId) {
      const spisok: ISpisok = spisoks[source.droppableId];
      const card: ICard = spisok.cards[source.index];
      spisok.cards.splice(source.index, 1);
      spisok.cards.splice(destination.index, 0, card);
      return;
    }
    const fromSpisok: ISpisok = spisoks[source.droppableId];
    const toSpisok: ISpisok = spisoks[destination.droppableId];
    const card: ICard = fromSpisok.cards[source.index];
    fromSpisok.cards.splice(source.index, 1);
    toSpisok.cards.splice(destination.index, 0, card);
    const idCard = card.idCard;
    const idSpisok = toSpisok.idSpisok;
    const response = await axios.post(`http://localhost:8080/card/updateSpisok/${idCard}/${idSpisok}`, card);
    console.log(response);
    //spisok.cards[source.index] = spisok.cards[destination.index];
    //spisok.cards[destination.index] = card;
  }

    return (
      <div className="currentkanban">
        <div id="header">
          <div id="kanbanInfo">
            <span id="title">
              {kanban.name}
            </span>
            <br/>
            <span id="desc">
              {kanban.description}
            </span>
            <br/>
            <Link style={{color: 'white'}} to={`/main/${user.idUser}`}>
              На главную
            </Link>
          </div>
          <div id="spisok">
            <button onClick={createSpisok}>Создать новую колонку</button>
          </div>
          <div id="mark">
            <button onClick={mark}>Просмотреть метки</button>
          </div>
          <div id="filter">
            <button onClick={filter}>Фильтр по меткам</button>
          </div>
          <div id="sort">
            <button id="sort" onClick={sort}>Отсортировать карточки по приоритетам</button>
          </div>
          <div id="sortUser">
            <button id="sortUser" onClick={sortUser}>
              {filterByCurrentUser ? "Отобразить все карточки":
              "Отобразить карточки, назначенные текущему пользователю"}
            </button>
          </div>
          <div id="userInfo">
            <span id="login">
              {user.login}
            </span>
            <br/>
            <span id="email">
              {user.email}
            </span>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-spisoks"
            direction="horizontal"
            type="spisok"
          >
            {provided => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                //style={{backgroundColor: 'red'}}
                className="list"
              >
                { //spisoks.sort((spisok1, spisok2) => spisok1.name.localeCompare(spisok2.name))
                spisoks.map((spisok, indexSpisoks) => <Spisok spisok={spisok}
                indexSpisoks={indexSpisoks} filterMarks={filterMarks}
                filterByCurrentUser={filterByCurrentUser} user={user} key={spisok.idSpisok} />)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div>
          <Modal open={marksIsOpen}>
            <MarkAll/>
            <br/>
            <button id="modalButton" onClick={() => setMarksIsOpen(false)}>Закрыть</button>
          </Modal>
          <Modal open={spisokAddIsOpen}>
            <SpisokAdd idKanban={kanban.idKanban}/>
            <br/>
            <button id="modalButton" onClick={() => setspisokAddIsOpen(false)}>Закрыть</button>
          </Modal>
          <Modal open={filterIsOpen}>
            { marks.map(mark => 
                <div key={mark.idMark}>
                  <input onClick={() => addFilter(mark)} type="checkbox" name="mark"/>
                  <span style={{color: mark.color === null ? "black": mark.color}}>
                  {mark.name}
                  </span>
                </div>)}
            <br/>
            <button id="modalButton" onClick={() => setFilterIsOpen(false)}>Закрыть</button>
          </Modal>
          <br/>
        </div>
      </div>
    );
  }
  
  export default CurrentKanban;