import { Button } from "primereact/button";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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


    
    const createBoard = () => {
        const randomShapes = [];
        var noShapes = {}
        let initialNumberOfShapes = 15;
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
    }, [])

    useEffect(() => {
        verifyChoice();
        setTimesRendered(timesRendered + 1)
    }, [selectedValue])

    const verifyChoice = () => {
        if(timesRendered >= 1){
            setIsClicked(true);
            if(selectedValue == currentNoShapes[wantedShape] || (selectedValue == "0" && currentNoShapes[wantedShape] == undefined)){
                setOutcome(true);
            }else{
                setOutcome(false);
                
            }
        }
    }

    const success = <span><h1>Bravo!</h1></span>
    const fail = <span><h1>Nažalost krivo, pokušaj ponovo!</h1></span>

    return (
        <div>
        <h1> Koliko oblika {wantedShape} ima na ekranu?</h1>
        <div className="app">
            <div className="game">

                {currentShapes.map((shape, index) => (
                    <img
                    key={index}
                    alt={shape}
                    />
                    
                ))}
            </div>
            <div>
                {numbers.map((number)=> (
                    <div className="buttonDiv">
                    <Button label={number} onClick={() => setSelectedValue(number)}/>
                    </div>
                    ))}
            </div>
            {!!isClicked ? (outcome ? success : fail) : null}
        </div>
        </div>
    )

}

export default Game1;