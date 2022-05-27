import "primeflex/primeflex.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-purple/theme.css";
import "primereact/resources/primereact.css";
import { Menubar } from "primereact/menubar";
import { ToastContext } from "./Toast";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import Main from "./Components/Main";
import { useHistory } from "react-router-dom";
import app from "./base";
import { Button } from "primereact/button";
import { useAuth } from "./Auth";
import "./App.css";

const App = () => {
  const history = useHistory();

  const toastRef = useRef(null);

  const menuItems = [
    {
      label: "Naslovnica",
      icon: "pi pi-home",
      command: () => {
        navigateToPage("/");
      },
    },
    {
      label: "Igre",
      icon: "pi pi-book",
      items: [
        {
          label: "Brojalica",
          icon: "pi pi-hashtag",
          command: () => {
            navigateToPage("/game-1");
          },
        },
        {
          label: "Odnosi među brojevima",
          icon: "pi pi-sort-numeric-down",
          command: () => {
            navigateToPage("/game-2");
          },
        },
        {
          label: "Zbrajalica",
          icon: "pi pi-plus",
          command: () => {
            navigateToPage("/game-3");
          },
        },
      ],
    },
  ];

  const navigateToPage = (path) => {
    history.push(path);
  };

  const start = (
    <img
      alt="logo"
      src="../../favicon.ico"
      height="40"
      className="mr-2 mb-0"
      style={{ cursor: "pointer" }}
      data-pr-tooltip="Početna stranica"
      onClick={() => history.push("/")}
    ></img>
  );

  const { currentUser } = useAuth();

  console.log(currentUser);

  const login = (
    <span>
      <Button
        label="Registracija"
        className="p-button-raised p-button-danger p-button-rounded mr-1"
        onClick={() => history.push("/register")}
      />
      <Button label="Prijava" className="p-button-raised p-button-rounded " onClick={() => history.push("/login")} />
    </span>
  );

  const logout = (
    <span className="flex flex-row">
      <Button label="Odjavi se" className="p-button-raised p-button-rounded" onClick={() => app.auth().signOut()} />
    </span>
  );

  return (
    <ToastContext.Provider value={{ toastRef }}>
      <Toast ref={toastRef} />
      <div className="main m-2">
        <Menubar className="mb-3" model={[...menuItems]} start={start} end={!!currentUser ? logout : login} />
        <Main />
      </div>
    </ToastContext.Provider>
  );
};

export default App;
