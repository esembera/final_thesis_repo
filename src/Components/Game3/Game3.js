import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth";
import Picture from "../Game2/Picture";
import { useDrop } from "react-dnd";
import { Button } from "primereact/button";
import Shape from "../Shared/Shape";
import tekstovi from "../Shared/Text";
import shapes from "../Shared/Shapes";
import PictureList from "../Shared/Options";
import { Card } from "primereact/card";
import { useHistory } from "react-router-dom";
import operations from "../Shared/Operations";
import "./Game3.css";
import equal from "../../assets/images/signs/equal-2.png";
import ShapesList from "../Shared/ShapesList";

const Game3 = () => {
  const [currentShapes1, setCurrentShapes1] = useState([]);
  const [currentShapes2, setCurrentShapes2] = useState([]);
  const [selectedShape1, setSelectedShape1] = useState();
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
  const [operation, setOperation] = useState("");

  const history = useHistory();

  const createBoard = () => {
    const shapes1 = [];
    const shapes2 = [];
    const randomShape1 = ShapesList[Math.floor(Math.random() * ShapesList.length)];
    console.log(randomShape1.id);
    const randomOperation = operations[Math.floor(Math.random() * operations.length)];
    setOperation(randomOperation);
    var noShapes1 = 0;
    var noShapes2 = 0;
    if (randomOperation.value === "minus") {
      noShapes1 = Math.floor(Math.random() * 9 + 1);
      noShapes2 = Math.floor(Math.random() * 9 + 1);
      while (noShapes2 >= noShapes1) {
        noShapes2 = Math.floor(Math.random() * 9 + 1);
      }
      setNoShapes1(noShapes1);
      setNoShapes2(noShapes2);
    }
    if (randomOperation.value === "plus") {
      noShapes1 = Math.floor(Math.random() * 5 + 1);
      noShapes2 = Math.floor(Math.random() * 5 + 1);
      setNoShapes1(noShapes1);
      setNoShapes2(noShapes2);
    }
    for (let i = 0; i < noShapes1; i++) {
      shapes1.push(randomShape1);
    }
    for (let i = 0; i < noShapes2; i++) {
      shapes2.push(randomShape1);
    }
    setSelectedShape1(randomShape1);
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
    console.log(id);
    const pictureList = ShapesList.filter((picture) => id === picture.id);
    setSelectedValue((selectedValue) => [...selectedValue, pictureList[0]]);
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

  return (
    <div>
      <div>
        <div className="absolute right-0 pr-3 text-primary font-medium">Trenutni niz: {currentStreak}</div>
        <div className="absolute left-0 pl-3 text-primary font-medium">
          <Button
            label={"Povratak na naslovnicu"}
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
              {tekstovi[operation.value]} {tekstovi[selectedShape1?.name]}{" "}
              <Shape klasa="titleShape" name={selectedShape1?.name} type="title" />
            </h1>
          </Card>
        </div>
        <div className="grid">
          <div className="col-3 right-100">
            <div className="flex flex-wrap justify-content-center">
              {currentShapes1.map((shape, index) => (
                <Shape name={shape.name} key={index} klasa="shape--game2" type="board" />
              ))}
            </div>
          </div>

          <div className="col-1">
            <div className="flex justify-content-center">
              <img className="operationPicture" src={operation.src} id={operation?.id} />
            </div>
          </div>

          <div className="col-3">
            <div className="flex flex-wrap justify-content-center">
              {currentShapes2.map((shape, index) => (
                <Shape name={shape.name} key={index} klasa="shape--game2" type="board" />
              ))}
            </div>
          </div>

          <div className="col-1">
            <div className="flex justify-content-center">
              <img className="operationPictureEqual" src={equal} />
            </div>
          </div>

          <div className="col-4">
            <div className="flex justify-content-center">
              <div className="board" ref={drop}>
                {selectedValue.map((value) => (
                  <Picture style={"one"} src={value?.src} id={value?.id} />
                ))}
              </div>
            </div>
          </div>

          {selectedShape1 && (
            <div className="pictures">
              <Picture name={selectedShape1.name} src={selectedShape1.src} id={selectedShape1.id} style={"many"} />
            </div>
          )}
        </div>
      </div>
      {/* <div className="message-container">{!!isClicked ? (outcome ? success : fail) : null}</div> */}
    </div>
  );
};

export default Game3;
