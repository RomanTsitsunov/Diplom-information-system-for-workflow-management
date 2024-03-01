import { IComment } from "./comment";
import { IMark } from "./mark";
import { IUsers } from "./users";

export interface ICard {
    idCard: number;
    name: string;
    description: string;
    date: string;
    priority: number;
    marks: IMark[];
    users: IUsers[];
    comments: IComment[];
}