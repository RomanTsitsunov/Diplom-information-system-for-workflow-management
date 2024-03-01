import { useLoaderData } from "react-router-dom";
import { IWorkspace } from "../models/workspace";
import axios from "axios";
import { IUsers } from "../models/users";

export async function userloader({params}: any) {
  //console.log("userloader");
  const idUser = params.id;
  let response;
  if(localStorage.getItem('role') !== '3') {
    response = await axios.get<IWorkspace[]>(`http://localhost:8080/workspace/${idUser}`);
  }
  else {
    response = await axios.get<IWorkspace[]>(`http://localhost:8080/workspace`);
  }
  const workspaces: IWorkspace[] = response.data;
  const props = {
    idUser: idUser,
    workspaces: workspaces,
  }
  return props;
}

export function useMain() {
  const props: any = useLoaderData();
  const idUser: number = props.idUser;
  const workspaces: IWorkspace[] = props.workspaces;
  //const [kanbans, setkanbans] = useState([]);
  //console.log(user);
  //console.log(localStorage.getItem('role'));
  // function render() {
  //   setworkspace(user.workspaces)
  // }

  // useEffect(() => {
  //   render()
  // }, [])

  //const workspaceKanban = function(id: number) {//Будет вызываться при клике по рабочему пространству
    //const workspace = event.target.value;
    //или
    //const workspace = workspaces[id];
    //setkanbans(workspace.kanban);
  //}

  //const kanban = function(id: number) {//Будет вызываться при клике по доске
    //const kanban = event.target.value;
    //или
    //const kanban = kanbans[id];
    //window.location.assign(`http://localhost:3000/kanban/${id}`);
  //}

  return {idUser, workspaces};
}