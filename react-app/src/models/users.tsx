import { IRole } from "./role";

export interface IUsers {
    idUser: number;
    name: string;
    surname: string;
    otchestvo: string;
    phone: string;
    email: string;
    login: string;
    pass: string;
    role: IRole;
}