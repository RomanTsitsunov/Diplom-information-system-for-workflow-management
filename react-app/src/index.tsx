import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './components/login';
import Registration from './components/registration';
import Main from './components/main';
import { IUsers } from './models/users';
import Kanban from './components/kanban/kanban';
import { userloader } from './hooks/main';
import CurrentKanban from './components/currentkanban';
import { kanbanloader } from './hooks/currentkanban';
import { Authrequire } from './components/authrequire';
import { AuthProvider } from './archive/authprovider';

const router = createBrowserRouter([
  /*
  {
    path: "/",
    element: <App />,
  },
  */
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    element: <Authrequire />,
    children: [
    {
      path: `/main/:id`,
      element: <Main />,
      loader: userloader,
    },
    {
      path: `/:idUser/kanban/:idKanban`,
      element: <CurrentKanban />,
      loader: kanbanloader,
    },
    ]
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
    <RouterProvider router={router} />
  //</React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
