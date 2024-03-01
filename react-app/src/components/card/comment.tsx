import { IComment } from "../../models/comment";
import "../../css/card/comment.css"
import { useState } from "react";
import axios from "axios";
import CommentRedact from "./commentredact";
import Modal2 from "../modal/modal2";

interface CommentProps {
    comment: IComment
}

function Comment({comment}: CommentProps) {
    const [commentRedactIsOpen, setCommentRedactIsOpen] = useState(false);
    const [delWarningView, setDelWarningView] = useState(false);

    function redactComment() {
        setDelWarningView(false);
        setCommentRedactIsOpen(true);
    }
    function delComment() {
        setDelWarningView(!delWarningView);
    }
    async function confirmDel() {
        const idComment: number = comment.idComment;
        const response = await axios.delete(`http://localhost:8080/comment/${idComment}`);
        console.log(response);
        setDelWarningView(false);
        window.location.reload();
    }
    const date: Date = new Date(comment.date);

    return (
        <div className="comment">
            <span id="user">
                Пользователь: {comment.user.login}
            </span>
            <br/>
            <span id="date">
                Дата: {date.toLocaleString()}
            </span>
            <br/>
            <div id="text">
                {comment.text}
            </div>
            {(localStorage.getItem("idUser") === comment.user.idUser.toString() || 
            localStorage.getItem('role') === '3') && <>
                <Modal2 open={commentRedactIsOpen}>
                    <CommentRedact comment={comment}/>
                    <br/>
                    <button id="modalButton" onClick={() => setCommentRedactIsOpen(false)}>Закрыть</button>
                </Modal2>
                <button onClick={redactComment}>Редактировать</button>
                {`\t`}
                <button onClick={delComment}>Удалить</button>
                <br/>
                {delWarningView && <><span id="warning">Вы уверены что хотите удалить комментарий?</span>
                    <br/>
                    <button onClick={confirmDel}>Да</button>
                    {`\t`}
                    <button onClick={delComment}>Нет</button></>}
            </>}
        </div>
    );
}

export default Comment;