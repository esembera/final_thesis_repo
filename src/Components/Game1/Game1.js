import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import './Game1.css'


const shapes = [
    'green-apple',
    'red-apple',
    'bannana',
    'pear',
    'car',
    'tree',
    'bird',
    'candy',
    'chocolate',
    'cookie'
]

const numbers = ["0",1,2,3,4,5,6,7,8,9]

const Game1 = () => {

    const [currentShapes, setCurrentShapes] = useState([])
    const [currentNoShapes, setCurrentNoShapes] = useState({})
    const [wantedShape, setWantedShape] = useState('')
    const [selectedValue, setSelectedValue] = useState(null)
    const [outcome, setOutcome] = useState(null)
    const [isClicked, setIsClicked] = useState(false)
    const [timesRendered, setTimesRendered] = useState(0)
    const [isDisabled, setIsDisabled] = useState(false)
    const [currentStreak, setCurrentStreak] = useState(0)
    const [refreshPage, setRefreshPage] = useState(0)

    let initialNumberOfShapes = 20;

    
    const createBoard = () => {
        const randomShapes = [];
        var noShapes = {}
        for (let i=0; i<initialNumberOfShapes; i++){
            const randomShape = shapes[Math.floor(Math.random()*shapes.length)];
            if(!noShapes[randomShape]){
                noShapes[randomShape] = 1;
                randomShapes.push(randomShape);
            }else if(noShapes[randomShape] < 10){
                noShapes[randomShape] += 1;
                randomShapes.push(randomShape);
            }else{
                initialNumberOfShapes +=1;
            }
        }

        setCurrentShapes(randomShapes);
        setCurrentNoShapes(noShapes)
    }

    const randomShapeYoureLookingFor = () => {
        const shapeYoureLookingFor = shapes[Math.floor(Math.random()*shapes.length)];
        setWantedShape(shapeYoureLookingFor)
    }

    useEffect(() => {
        createBoard();
        randomShapeYoureLookingFor();
        const streak = JSON.parse(localStorage.getItem('savedStreak'))
        if(streak){
            setCurrentStreak(streak)
        }
    }, [refreshPage])

    useEffect(() => {
        verifyChoice();
        setTimesRendered(timesRendered + 1)
    }, [selectedValue])

    useEffect(() => {
        localStorage.setItem('savedStreak', JSON.stringify(currentStreak))
    }, [currentStreak])

    const verifyChoice = () => {
        if(timesRendered >= 1){
            setIsClicked(true);
            if(selectedValue === currentNoShapes[wantedShape] || (selectedValue === "0" && currentNoShapes[wantedShape] === undefined)){
                setOutcome(true);
                setIsDisabled(true);
                setCurrentStreak(currentStreak + 1);
            }else{
                setOutcome(false);
                setCurrentStreak(0);                
            }
        }
    }

    const refreshPageAndSaveProgress = () => {
        setIsDisabled(false);
        setIsClicked(false);
        setSelectedValue(null);
        setTimesRendered(0);
        setRefreshPage(refreshPage + 1);
    }

    const success = <div className=""><h1 className="text-center">Bravo!</h1><Button label="Klikni me kada si spreman za novi krug!" onClick={() => refreshPageAndSaveProgress()}/></div>
    const fail = <h1>Nažalost krivo, pokušaj ponovo!</h1>


    const enable = numbers.map((number)=> (
                    <div className="buttonDiv">
                    <Button label={number} onClick={() => setSelectedValue(number)}/>
                    </div>))
    const disable = numbers.map((number)=> (
                    <div className="buttonDiv">
                    <Button label={number} disable/>
                    </div>))

    console.log(isDisabled)

    return (
        <div className="flex flex-wrap">
        <h1> Koliko oblika {wantedShape} ima na ekranu?</h1>
            <div className="absolute right-0 pr-3 text-primary font-medium">
                Trenutni niz: {currentStreak}
            </div>
        <div className="">
            <div className="game">

                {currentShapes.map((shape, index) => (
                    <img
                    key={index}
                    alt={shape}
                    />
                    
                ))}
            </div>
            <div className="flex justify-content-center">
                {isDisabled ? disable : enable}
            </div>
            <div className="flex justify-content-center">
            {!!isClicked ? (outcome ? success : fail) : null}
                
            </div>
        </div>
        </div>
    )

}

export default Game1;