import { ICard } from "../models/card";
import Mark from "./mark/mark";

interface CardProps {
    card: ICard
}

function CurrentCard({card}: CardProps) {
    return (
        <div>
            {card.name}   {card.description}   {card.date}<br/><br/>
            { card.marks.map(mark => <Mark mark={mark} key={mark.idMark} />)}<br/>
            {/* { card.checkLists.map(checklist =>
            <Checklist checklist={checklist} key={checklist.idChecklist} />)}<br/> */}
        </div>
    );
}

export default CurrentCard;