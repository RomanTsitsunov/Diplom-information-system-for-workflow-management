import React from "react";

type Props = {
    data: Array<{
            columnName: string;
            cards: Array<{
                cardName: string;
                [key: string]: any;
            }>;
        }>;
}
//  function Qwe(id: number) {
//   const navigateto = useMemo(() => {
//     const navtag = <Link to={`http://localhost:3000/main/${id}`}/>;
//   }, []);
//   };
//   const navigate = useRef(<Link to={`http://localhost:3000/main/${id}`}/>);

/*
function Main (props: Props) {
    return (
        <div>
{props.data.map((column) => <Column data={column.cards} />)}
        </div>
    );
}
*/

// КОНЕЧНО !!!!
// Как оно должно было работать?
// эвенты на редеректы были ?
// есни не хочешь учитьсчя, то просто поставь react-router-dom либу
// коротакая дока
// но она тебе вме решит

//export default Main;