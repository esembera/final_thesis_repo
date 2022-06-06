import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/Auth";
import Picture from "../Shared/Picture";
import { useDrop } from "react-dnd";
import { Button } from "primereact/button";
import Shape from "../Shared/Shape";
import tekstovi from "../Shared/Interfaces/Text";
import { Card } from "primereact/card";
import { useHistory } from "react-router-dom";
import operations from "../Shared/Interfaces/Operations";
import "./Game3.css";
import equal from "../../assets/images/signs/equal-2.png";
import ShapesList from "../Shared/Interfaces/ShapesList";
import { ToastContext } from "../Shared/Toast";

const Game3 = () => {
  const [currentShapes1, setCurrentShapes1] = useState([]);
  const [currentShapes2, setCurrentShapes2] = useState([]);
  const [selectedShape1, setSelectedShape1] = useState();
  const [selectedValue, setSelectedValue] = useState([]);
  const [outcome, setOutcome] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [noShapes1, setNoShapes1] = useState(0);
  const [noShapes2, setNoShapes2] = useState(0);
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(0);
  const [calcResult, setCalcResult] = useState(0);
  const [previousResults, setPreviousResults] = useState(0);
  const [show, setShow] = useState(true);

  const history = useHistory();

  const { toastRef } = useContext(ToastContext);

  var result1 = 0;
  const createBoard = () => {
    const shapes1 = [];
    const shapes2 = [];
    const randomShape1 = ShapesList[Math.floor(Math.random() * ShapesList.length)];
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
      setResult(noShapes1 - noShapes2);
      setNoShapes1(noShapes1);
      setNoShapes2(noShapes2);
    }
    if (randomOperation.value === "plus") {
      noShapes1 = Math.floor(Math.random() * 5 + 1);
      noShapes2 = Math.floor(Math.random() * 5 + 1);
      setResult(noShapes1 + noShapes2);
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
    const pictureList = ShapesList.filter((picture) => id === picture.id);
    result1++;
    setCalcResult(result1);
    setSelectedValue((selectedValue) => [...selectedValue, pictureList[0]]);
  };

  const currentUser = useContext(AuthContext);

  useEffect(() => {
    createBoard();
    const streak = JSON.parse(localStorage.getItem(`${currentUser.currentUser?.multiFactor?.user?.email}:game3Streak`));
    if (streak) {
      setCurrentStreak(streak);
    }
  }, []);

  const CheckAnswer = () => {
    setIsClicked(true);
    if (result === calcResult || calcResult - previousResults === result) {
      setOutcome(true);
      setCurrentStreak(currentStreak + 1);
      setShow(false);
    } else {
      setSelectedValue([]);
      setCurrentStreak(0);
      setOutcome(false);
    }
    setPreviousResults(calcResult + previousResults);
  };

  useEffect(() => {
    localStorage.setItem(
      `${currentUser.currentUser?.multiFactor?.user?.email}:game3Streak`,
      JSON.stringify(currentStreak)
    );
  }, [currentStreak]);

  const refreshPageAndSaveProgress = () => {
    window.location.reload();
  };

  const success = (
    <div className="">
      <h1 className="text-center">Bravo!</h1>
      <Button label="Klikni me kada si spreman za novi krug!" onClick={() => refreshPageAndSaveProgress()} />
    </div>
  );
  const fail = <h1 style={{ top: "90%" }}>Nažalost krivo, pokušaj ponovo!</h1>;

  const footer = (
    <span className="flex justify-content-center">
      <Button
        icon="pi pi-question"
        style={{ marginTop: "5px", zIndex: '1' }}
        onClick={() =>
          toastRef.current.show({
            severity: "info",
            summary: "Informacije",
            detail:
              "Privucite oblik u ocrtano područje onoliko puta koliko želite da iznosi vaše riješenje i zatim pritisnite na gumb provjeri rezultat.",
          })
        }
      />
    </span>
  );

  return (
    <div>
      <div>
        <div className="absolute right-0 pr-3 text-primary font-medium">
          {footer}
          Trenutni niz: {currentStreak}
        </div>
        <div className="absolute left-0 pl-3 text-primary font-medium">
          <Button
            label={"Povratak na naslovnicu"}
            onClick={() => history.push("/")}
            icon="pi pi-angle-left"
            iconPos="left"
            style={{ zIndex: "1" }}
          />
        </div>
      </div>
      <div className="container--game3">
        <div className="absolute right-0 text-primary font-medium gumbic">
          <Button label={"Provjeri rezultat"} onClick={() => CheckAnswer()}></Button>
        </div>
        <div className="flex justify-content-center block mb-5">
          <Card>
            <h1>
              {tekstovi[operation.value]} {tekstovi[selectedShape1?.name]}
              {""}
              <Shape klasa="titleShape" name={selectedShape1?.name} type="title" />?
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
              <div className="board" ref={drop} style={{ width: "90%", height: "300px" }}>
                {selectedValue.map((value) => (
                  <Picture style={"many"} src={value?.src} id={value?.id} />
                ))}
              </div>
            </div>
          </div>

          {selectedShape1 && show && (
            <div className="pictures">
              <Picture name={selectedShape1.name} src={selectedShape1.src} id={selectedShape1.id} style={"many"} />
            </div>
          )}
        </div>
      </div>
      <div className={outcome ? "message-container--game3-succes" : "message-container--game3-fail"}>
        {!!isClicked ? (outcome ? success : fail) : null}
      </div>
    </div>
  );
};

export default Game3;
