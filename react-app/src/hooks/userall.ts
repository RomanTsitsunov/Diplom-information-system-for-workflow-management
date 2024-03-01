import axios from "axios";
import { IUsers } from "../models/users";
import { useEffect, useState } from "react";

function useUserAll() {
    async function getUsers() {
        const response = await axios.get<IUsers[]>(`http://localhost:8080/user`);
        const users: IUsers[] = response.data;
        setUsers(users);
    }

    const [users, setUsers] = useState<IUsers[]>([]);

    useEffect(() => {
        getUsers();
    }, []);

    return users;
}

export default useUserAll;