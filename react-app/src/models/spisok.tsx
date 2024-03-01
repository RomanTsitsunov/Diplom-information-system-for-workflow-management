import { ICard } from "./card";

export interface ISpisok {
    idSpisok: number;
    name: string;
    description: string;
    cards: ICard[];
}