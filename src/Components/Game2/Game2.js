import { Button } from "primereact/button";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth";
import './Game2.css'
import { Card } from "primereact/card";
import { Container } from "./Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Dustbin } from "./Dustbin";
import { Box } from "./Box";


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


const options = [
    {
        id: 1,
        value: '>'
    },
    {
        id: 2,
        value: '<'
    },
    {
        id: 3,
        value: '='
    }
]
const Game2 = () => {
    

    const [currentShapes1, setCurrentShapes1] = useState([])
    const [currentShapes2, setCurrentShapes2] = useState([])
    const [selectedShape1, setSelectedShape1] = useState('')
    const [selectedShape2, setSelectedShape2] = useState('')
    const [selectedValue, setSelectedValue] = useState(null)
    const [outcome, setOutcome] = useState(null)
    const [isClicked, setIsClicked] = useState(false)
    const [timesRendered, setTimesRendered] = useState(0)
    const [currentStreak, setCurrentStreak] = useState(0)
    const [refreshPage, setRefreshPage] = useState(0)
    
    
    const currentUser = useContext(AuthContext);
    
    const createBoard = () => {
        const shapes1 = [];
        const shapes2 = [];
        var noShapes = {};
        const randomShape1 = shapes[Math.floor(Math.random()*shapes.length)];
        const randomShape2 = shapes[Math.floor(Math.random()*shapes.length)];
        const noShapes1 = Math.floor(Math.random() * 9 + 1);
        const noShapes2 = Math.floor(Math.random() * 9 + 1);
        noShapes[randomShape1]=noShapes1;
        noShapes[randomShape2]=noShapes2;
        for (let i=0; i<noShapes1; i++){
            shapes1.push(randomShape1);
        }
        for (let i=0; i<noShapes2; i++){
            shapes2.push(randomShape2);
        }
        setSelectedShape1(randomShape1);
        setSelectedShape2(randomShape2);
        setCurrentShapes1(shapes1);
        setCurrentShapes2(shapes2);
    }


    useEffect(() => {
        createBoard();
        const streak = JSON.parse(localStorage.getItem(`${currentUser.currentUser?.multiFactor?.user?.email}:game1Streak`))
        if(streak){
            setCurrentStreak(streak)
        }
    }, [refreshPage])

    // useEffect(() => {
    //     verifyChoice();
    //     setTimesRendered(timesRendered + 1)
    // }, [selectedValue])

    useEffect(() => {
        localStorage.setItem(`${currentUser.currentUser?.multiFactor?.user?.email}:game1Streak`, JSON.stringify(currentStreak))
    }, [currentStreak])

    // const verifyChoice = () => {
    //     if(timesRendered >= 1){
    //         setIsClicked(true);
    //         if(selectedValue === currentNoShapes[wantedShape] || (selectedValue === "0" && currentNoShapes[wantedShape] === undefined)){
    //             setOutcome(true);
    //             setCurrentStreak(currentStreak + 1);
    //         }else{
    //             setOutcome(false);
    //             setCurrentStreak(0);                
    //         }
    //     }
    // }

    const refreshPageAndSaveProgress = () => {
        setIsClicked(false);
        setSelectedValue(null);
        setTimesRendered(0);
        setRefreshPage(refreshPage + 1);
    }



    return (
        <div>
                <div className="absolute right-0 pr-3 text-primary font-medium">
                    Trenutni niz: {currentStreak}
                </div>
                <div className="flex justify-content-center block">
                    <h1> Ima li na ekranu više {selectedShape1} ili {selectedShape2} ?</h1>
                </div>
                <div className="grid">
                    <div className="col-5">

                        {currentShapes1.map((shape, index) => (
                            <img
                            key={index}
                            alt={shape}
                            />
                            
                        ))}
                    </div>

                    <div className="col-2 justify-content-center">
                        <DndProvider backend={HTML5Backend}>
                            <div>
                            <Dustbin/>
                            </div>


                            <div style={{overflow: 'hidden', clear: 'both'}}>

                               {options.map((value) => (
                                   <Box title={value.value} key={value.id}/>
                                ))}

                            </div>

                        </DndProvider>
                    </div>
                    
                    <div className="col-5">
                        {currentShapes2.map((shape, index) => (
                                <img
                                key={index}
                                alt={shape}
                                />
                                
                            ))}

                    </div>
                </div>
                <div className="flex justify-content-center">
                    {!!isClicked ? (outcome ? success : fail) : null}        
                </div>
        </div>
    )

}

export default Game2;