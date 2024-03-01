import { IMark } from "../../models/mark";

interface MarkProps {
    mark: IMark
}

function Mark({mark}: MarkProps) {
    return (
        <div>
          <span style={
            {color: mark.color === null ? "black": mark.color}
            }>
            {mark.name}
          </span>
        </div>
    );
}

export default Mark;