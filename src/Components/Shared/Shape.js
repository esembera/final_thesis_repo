import React from 'react'

import banana from '../../assets/images/shapes/banana.jpg'
import red_apple from '../../assets/images/shapes/red_apple.png'
import green_apple from '../../assets/images/shapes/green_apple.png'
import car from '../../assets/images/shapes/car.png'
import bird from '../../assets/images/shapes/bird.png'
import chocolate from '../../assets/images/shapes/chocolate.png'
import candy from '../../assets/images/shapes/candy.png'
import cookie from '../../assets/images/shapes/cookie.png'
import tree from '../../assets/images/shapes/tree.png'
import pear from '../../assets/images/shapes/pear.png'
import './Shape.css'

const ShapesList = [
    {
        id: 1,
        src: banana,
        name: "banana"
    },
    {
        id: 2,
        src: red_apple,
        name: "red_apple"
    },
    {
        id: 3,
        src: green_apple,
        name: "green_apple"
    },
    {
        id: 4,
        src: car,
        name: "car"
    },
    {
        id: 5,
        src: bird,
        name: "bird"
    },
    {
        id: 6,
        src: chocolate,
        name: "chocolate"
    },
    {
        id: 7,
        src: candy,
        name: "candy"
    },
    {
        id: 8,
        src: cookie,
        name: "cookie"
    },
    {
        id: 9,
        src: tree,
        name: "tree"
    },
    {
        id: 10,
        src: pear,
        name: "pear"
    },

]

function Shape({name, klasa}) {
    const picture = ShapesList.filter((shape) => { return name === shape.name})

  return (
    <img 
    className={klasa}
    src={picture.map((picture) => picture.src)}
    />
  )
}

export default Shape