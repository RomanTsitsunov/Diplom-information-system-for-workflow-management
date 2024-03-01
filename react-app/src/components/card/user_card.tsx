import { IUsers } from "../../models/users";

interface UserCardProps {
    user: IUsers
}

function UserCard({user}: UserCardProps) {
    return (
        <div>
          <span >
            {user.login} {user.email}
          </span>
        </div>
    );
}

export default UserCard;