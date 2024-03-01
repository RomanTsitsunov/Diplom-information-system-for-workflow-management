import axios from "axios";
import { useState, useEffect } from "react";
import { IMark } from "../models/mark";

function useMarkAll() {
    async function getMarks() {
        const response = await axios.get<IMark[]>(`http://localhost:8080/mark`);
        const marks: IMark[] = response.data;
        setMarks(marks);
    }

    const [marks, setMarks] = useState<IMark[]>([]);

    useEffect(() => {
        getMarks();
    }, []);

    return marks;
}

export default useMarkAll;