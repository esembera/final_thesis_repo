import { Button } from "primereact/button";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


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

const Game1 = () => {

    const [currentShapes, setCurrentShapes] = useState([])
    const [currentNoShapes, setCurrentNoShapes] = useState({})
    const [wantedShape, setWantedShape] = useState('')

    
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


    console.log(currentShapes, currentNoShapes);

    return (
        <div className="app">
            <h1> Koliko oblika {wantedShape} ima na ekranu?</h1>
            <div className="game">

                {currentShapes.map((shape, index) => (
                    <img
                    key={index}
                    alt={shape}
                    />
                    
                ))}

            </div>
        </div>
    )

}

export default Game1;