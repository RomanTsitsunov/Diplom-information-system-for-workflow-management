import { ICard } from "../models/card";
import { IMark } from "../models/mark";
import { ISpisok } from "../models/spisok";

interface FilterProps {
    spisok: ISpisok,
    filterMarks: IMark[]
}

export function useFilter({spisok, filterMarks}: FilterProps) {
    const cards: ICard[] = spisok.cards.filter(card => {
        for(let mark of filterMarks) {
          if(!card.marks.map(m => m.idMark).includes(mark.idMark)) {
            return false;
          }
        }
        return true;
    })

    return cards;
}