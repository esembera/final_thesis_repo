import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth";
import "./Game2.css";
import Picture from "./Picture";
import { useDrop } from "react-dnd";
import { Button } from "primereact/button";
import Shape from "../Shared/Shape";
import tekstovi from "../Shared/Text";
import shapes from "../Shared/Shapes";
import PictureList from "../Shared/Options";
import { Card } from "primereact/card";
import { useHistory } from "react-router-dom";
import { ToastContext } from "../../Toast";

const Game2 = () => {
  const [currentShapes1, setCurrentShapes1] = useState([]);
  const [currentShapes2, setCurrentShapes2] = useState([]);
  const [selectedShape1, setSelectedShape1] = useState("");
  const [selectedShape2, setSelectedShape2] = useState("");
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [outcome, setOutcome] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [timesRendered, setTimesRendered] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [refreshPage, setRefreshPage] = useState(0);
  const [noShapes1, setNoShapes1] = useState(0);
  const [noShapes2, setNoShapes2] = useState(0);
  const [failed, setFailed] = useState(0);

  const history = useHistory();
  const { toastRef } = useContext(ToastContext);

  const createBoard = () => {
    const shapes1 = [];
    const shapes2 = [];
    const randomShape1 = shapes[Math.floor(Math.random() * shapes.length)];
    var tempShape = shapes[Math.floor(Math.random() * shapes.length)];
    while (tempShape === randomShape1) {
      tempShape = shapes[Math.floor(Math.random() * shapes.length)];
    }
    const randomShape2 = tempShape;
    const noShapes1 = Math.floor(Math.random() * 9 + 1);
    const noShapes2 = Math.floor(Math.random() * 9 + 1);
    setNoShapes1(noShapes1);
    setNoShapes2(noShapes2);
    for (let i = 0; i < noShapes1; i++) {
      shapes1.push(randomShape1);
    }
    for (let i = 0; i < noShapes2; i++) {
      shapes2.push(randomShape2);
    }
    setSelectedShape1(randomShape1);
    setSelectedShape2(randomShape2);
    setCurrentShapes1(shapes1);
    setCurrentShapes2(shapes2);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const pictureList = PictureList.filter((picture) => id === picture.id);
    setSelectedValue(pictureList[0]);
    setSelectedId(id);
  };

  const currentUser = useContext(AuthContext);

  useEffect(() => {
    verifyChoice();
    setTimesRendered(timesRendered + 1);
  }, [isOver]);

  useEffect(() => {
    createBoard();
    const streak = JSON.parse(localStorage.getItem(`${currentUser.currentUser?.multiFactor?.user?.email}:game2Streak`));
    if (streak) {
      setCurrentStreak(streak);
    }
  }, [refreshPage]);

  const resetProgress = () => {
    var streak = JSON.parse(localStorage.getItem(`${currentUser.currentUser?.multiFactor?.user?.email}:game2Streak`));
    streak = 0;
    localStorage.setItem(`${currentUser.currentUser?.multiFactor?.user?.email}:game2Streak`, JSON.stringify(streak));
    setFailed(0);
  };

  const verifyChoice = () => {
    if (timesRendered >= 1) {
      setIsClicked(true);
      if (selectedId === 1 && noShapes1 == noShapes2) {
        setOutcome(true);
      } else if (selectedId === 2 && noShapes1 < noShapes2) {
        setOutcome(true);
      } else if (selectedId === 3 && noShapes1 > noShapes2) {
        setOutcome(true);
      } else {
        setOutcome(false);
        setFailed(failed + 1);
        if (failed === 3) {
          resetProgress();
        }
      }
    }
  };

  const saveProgress = () => {
    var streak = JSON.parse(localStorage.getItem(`${currentUser.currentUser?.multiFactor?.user?.email}:game2Streak`));
    streak = streak + 1;
    setCurrentStreak(streak);
    console.log(streak, currentStreak);
    localStorage.setItem(`${currentUser.currentUser?.multiFactor?.user?.email}:game2Streak`, JSON.stringify(streak));
  };

  const refreshPageAndSaveProgress = () => {
    saveProgress();
    setIsClicked(false);
    setSelectedValue(null);
    setTimesRendered(0);
    setRefreshPage(refreshPage + 1);
  };

  const success = (
    <div className="">
      <h1 className="text-center">Bravo!</h1>
      <Button label="Klikni me kada si spreman za novi krug!" onClick={() => refreshPageAndSaveProgress()} />
    </div>
  );
  const fail = <h1>Nažalost krivo, pokušaj ponovo!</h1>;

  const footer = (
    <span className="flex justify-content-center">
      <Button
        icon="pi pi-question"
        onClick={() =>
          toastRef.current.show({
            severity: "info",
            summary: "Informacije",
            detail: "Privucite željeni oblik u ocrtano područje.",
          })
        }
      />
    </span>
  );

  return (
    <div>
      <div>
        <div className="absolute right-0 pr-3 text-primary font-medium">
          {footer}Trenutni niz: {currentStreak}
        </div>
        <div className="absolute left-0 pl-3 text-primary font-medium">
          <Button
            label={"Povratak na naslovnicu"}
            style={{ zIndex: "1" }}
            onClick={() => history.push("/")}
            icon="pi pi-angle-left"
            iconPos="left"
          ></Button>
        </div>
      </div>
      <div className="container">
        <div className="flex justify-content-center block mb-8">
          <Card>
            <h1>
              KOJI JE ODNOS {tekstovi[selectedShape1]} <Shape klasa="titleShape" name={selectedShape1} type="title" /> I{" "}
              {tekstovi[selectedShape2]} <Shape klasa="titleShape" name={selectedShape2} type="title" /> ?
            </h1>
          </Card>
        </div>
        <div className="grid">
          <div className="col-5 right-100">
            <div className="flex flex-wrap justify-content-center">
              {currentShapes1.map((shape, index) => (
                <Shape name={shape} key={index} klasa="shape--game2" type="board" />
              ))}
            </div>
          </div>

          <div className="col-2">
            <div className="flex justify-content-center">
              <div className="board" ref={drop}>
                <Picture style={"one"} src={selectedValue?.src} id={selectedValue?.id} />
              </div>
            </div>
          </div>

          <div className="col-5">
            <div className="flex flex-wrap justify-content-center">
              {currentShapes2.map((shape, index) => (
                <Shape name={shape} key={index} klasa="shape--game2" type="board" />
              ))}
            </div>
          </div>
          <div className="pictures">
            {PictureList.map((picture) => (
              <Picture style={"many"} src={picture.src} id={picture.id} key={picture.id} />
            ))}
          </div>
        </div>
      </div>
      <div className="message-container">{!!isClicked ? (outcome ? success : fail) : null}</div>
    </div>
  );
};

export default Game2;
