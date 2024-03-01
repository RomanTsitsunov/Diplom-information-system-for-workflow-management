import { IUsers } from "./users";

export interface IComment {
    idComment: number;
    text: string;
    date: string;
    user: IUsers;
}