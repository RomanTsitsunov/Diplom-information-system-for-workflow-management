import axios from "axios";
import { IUsers } from "../models/users";
import { useEffect, useState } from "react";

interface CurrentUserProps {
    idUser: number;
}

function useCurrentUser({idUser}: CurrentUserProps) {
    async function getUser() {
        const response = await axios.get<IUsers>(`http://localhost:8080/user/id/${idUser}`);
        const user: IUsers = response.data;
        setUser(user);
    }

    const [user, setUser] = useState<IUsers>({
        idUser: -1,
        name: '',
        surname: '',
        otchestvo: '',
        phone: '',
        email: '',
        login: '',
        pass: '',
        role: {
            idRole: 0,
            name: '',
            levelAccess: 1
        }
    }
    );

    useEffect(() => {
        getUser();
    }, []);

    return user;
}

export default useCurrentUser;