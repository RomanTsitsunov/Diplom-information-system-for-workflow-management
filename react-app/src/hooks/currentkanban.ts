import axios from "axios";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { IKanban } from "../models/kanban";
import { ISpisok } from "../models/spisok";
import { IUsers } from "../models/users";

export async function kanbanloader({params}: any) {
    const idKanban = params.idKanban;
    const responseKanban = await axios.get<IKanban>(`http://localhost:8080/kanban/${idKanban}`);
    const responseUser = await axios.get<IUsers>(`http://localhost:8080/user/id/${params.idUser}`);
    const kanban: IKanban = responseKanban.data;
    const user: IUsers = responseUser.data;
    const props = {
        user: user,
        kanban: kanban,
    }
    return props;
}

export function useCurrentKanban() {
    async function setSpisoks(kanban: IKanban) {
        const response = await axios.post<ISpisok[]>(`http://localhost:8080/spisok`, kanban);
        const spisoks: ISpisok[] = response.data;
        for(let spisok of spisoks) {
            spisok.cards.sort((a, b) => a.priority - b.priority);
        }
        setspisok(spisoks);
    }
    
    const [spisoks, setspisok] = useState<ISpisok[]>([]);
    //const [idUser, setidUser] = useState<number>(0);
    const props: any = useLoaderData();
    //const idUser = props.idUser;
    const kanban: IKanban = props.kanban;
    const user: IUsers = props.user;
    //const [kanbans, setkanbans] = useState([]);
    useEffect(() => {
    setSpisoks(kanban);
    }, []);
    //console.log(spisoks);

    return {kanban, spisoks, user};
}