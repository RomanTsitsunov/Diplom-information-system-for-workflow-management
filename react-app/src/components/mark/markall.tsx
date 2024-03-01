import useMarkAll from "../../hooks/markall";
import "../../css/mark/markall.css"
import { useState } from "react";
import MarkAdd from "./markadd";
import Modal2 from "../modal/modal2";
import MarkWithButtons from "./markWithButtons";

function MarkAll() {
    const marks = useMarkAll();
    const [markAddIsOpen, setmarkAddIsOpen] = useState(false);
    //const [markRedactIsOpen, setmarkRedactIsOpen] = useState(false);
    //const [delWarningView, setDelWarningView] = useState(false);
    //const [mark, setMark] = useState<IMark>();
    //const [error, seterror] = useState('');

    function createMark() {
        setmarkAddIsOpen(true);
    }
    // function redactMark() {
    //     seterror("");
    //     setDelWarningView(false);
    //     if(mark === undefined) {
    //         seterror("Выберите метку для редактирования");
    //         return;
    //     }
    //     setmarkRedactIsOpen(true);
    // }
    // function delMark() {
    //     seterror("");
    //     if(mark === undefined) {
    //         seterror("Выберите метку для удаления");
    //         return;
    //     }
    //     setDelWarningView(!delWarningView);
    // }
    // async function confirmDel() {
    //     if(mark === undefined) {
    //         return;
    //     }
    //     const id: number = mark.idMark;
    //     const response = await axios.delete(`http://localhost:8080/mark/${id}`);
    //     console.log(response);
    //     setDelWarningView(false);
    //     window.location.reload();
    //   }

    return (
        <div className="markall">
            <span id="title">
                Метки
            </span>
            <br/>
            { marks.map(mark => <MarkWithButtons mark={mark} key={mark.idMark}/>)}
                {/* <div key={mark.idMark}>
                    <input onClick={() => setMark(mark)} type="radio" name="mark"/>
                    <span style={{color: mark.color === null ? "black": mark.color.color}}>
                    {mark.name}
                    </span>
                </div>)} */}
            <br/>
            <button onClick={createMark}>Добавить метку</button>
            {/* <button onClick={redactMark}>Редактировать</button>
            <button onClick={delMark}>Удалить</button>
            <br/>
            {delWarningView && <><span id="warning">Вы уверены что хотите удалить метку?</span>
            <br/>
            <button onClick={confirmDel}>Да</button>
            <button onClick={delMark}>Нет</button></>}
            <br/>
            <span>{error}</span> */}
            <Modal2 open={markAddIsOpen}>
            <MarkAdd/>
            <br/>
            <button id="modalButton" onClick={() => setmarkAddIsOpen(false)}>Закрыть</button>
            </Modal2>
            {/* Альт вариант - вместо определения метки по айди через радиобатон,
            добавить кнопки редактирования и удаления для каждого компонента метки,
            тогда можно убрать радиобатон и вернуть компонент метки,
            а кнопка добавления будет снизу рядом с кнопкой выхода, например слево */}
        </div>
    )
}

export default MarkAll;