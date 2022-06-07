import { Button } from "primereact/button";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/Auth";
import "./Game1.css";
import Shape from "../Shared/Shape";
import shapes from "../Shared/Interfaces/Shapes";
import tekstovi from "../Shared/Interfaces/Text";
import { Card } from "primereact/card";
import { useHistory } from "react-router-dom";
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Game1 = () => {
  const [currentShapes, setCurrentShapes] = useState([]);
  const [currentNoShapes, setCurrentNoShapes] = useState({});
  const [wantedShape, setWantedShape] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [outcome, setOutcome] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [timesRendered, setTimesRendered] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [refreshPage, setRefreshPage] = useState(0);

  const history = useHistory();

  let initialNumberOfShapes = 20;

  const currentUser = useContext(AuthContext);

  const createBoard = () => {
    const randomShapes = [];
    var noShapes = {};
    for (let i = 0; i < initialNumberOfShapes; i++) {
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      if (!noShapes[randomShape]) {
        noShapes[randomShape] = 1;
        randomShapes.push(randomShape);
      } else if (noShapes[randomShape] < 10) {
        noShapes[randomShape] += 1;
        randomShapes.push(randomShape);
      } else {
        initialNumberOfShapes += 1;
      }
    }

    setCurrentShapes(randomShapes);
    setCurrentNoShapes(noShapes);
    const shapeYoureLookingFor = randomShapes[Math.floor(Math.random() * randomShapes.length)];
    setWantedShape(shapeYoureLookingFor);
  };

  useEffect(() => {
    createBoard();
    const streak = JSON.parse(localStorage.getItem(`${currentUser.currentUser?.multiFactor?.user?.email}:game1Streak`));
    if (streak) {
      setCurrentStreak(streak);
    }
  }, [refreshPage]);

  useEffect(() => {
    verifyChoice();
    setTimesRendered(timesRendered + 1);
  }, [selectedValue]);

  useEffect(() => {
    localStorage.setItem(
      `${currentUser.currentUser?.multiFactor?.user?.email}:game1Streak`,
      JSON.stringify(currentStreak)
    );
  }, [currentStreak]);

  const verifyChoice = () => {
    if (timesRendered >= 1) {
      setIsClicked(true);
      if (selectedValue === currentNoShapes[wantedShape]) {
        setOutcome(true);
        setIsDisabled(true);
        setCurrentStreak(currentStreak + 1);
      } else {
        setOutcome(false);
        setCurrentStreak(0);
      }
    }
  };

  const refreshPageAndSaveProgress = () => {
    setIsDisabled(false);
    setIsClicked(false);
    setSelectedValue(null);
    setTimesRendered(0);
    setRefreshPage(refreshPage + 1);
  };

  const success = (
    <div className="">
      <h1 className="text-center">BRAVO! &#128516; </h1>
      <Button label="Klikni me kada si spreman za novi krug!" onClick={() => refreshPageAndSaveProgress()} />
    </div>
  );
  const fail = <h1>NAŽALOST KRIVO, POKUŠAJ PONOVO! &#128546; </h1>;

  const enable = numbers.map((number, index) => (
    <div className="buttonDiv">
      <Button className="numberButton" label={number} key={index} onClick={() => setSelectedValue(number)} />
    </div>
  ));
  const disable = numbers.map((number, index) => (
    <div className="buttonDiv">
      <Button className="numberButton" label={number} key={index} disable />
    </div>
  ));

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
      <div className="flex justify-content-center block">
        <Card>
          <h1>
            <span>KOLIKO {tekstovi[wantedShape]} </span>
            <Shape name={wantedShape} klasa="titleShape" type="title" /> <span>IMA NA EKRANU?</span>
          </h1>
        </Card>
      </div>
      <div className="container-game1">
        <div className="flex justify-content-center align-content-center">
          <div className="flex flex-wrap justify-content-center game-container">
            {currentShapes.map((shape, index) => (
              <Shape name={shape} key={index} klasa="shape--game1" type="board" />
            ))}
          </div>
        </div>
        <div className="flex justify-content-center w-full">{isDisabled ? disable : enable}</div>
      </div>
      <div className="message-container-game1">{!!isClicked ? (outcome ? success : fail) : null}</div>
    </div>
  );
};

export default Game1;
