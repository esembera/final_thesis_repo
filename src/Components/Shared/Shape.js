import React from "react";

import banana from "../../assets/images/shapes/banana.png";
import red_apple from "../../assets/images/shapes/red_apple.png";
import green_apple from "../../assets/images/shapes/green_apple.png";
import car from "../../assets/images/shapes/car.png";
import bird from "../../assets/images/shapes/bird.png";
import chocolate from "../../assets/images/shapes/chocolate.png";
import candy from "../../assets/images/shapes/candy.png";
import cookie from "../../assets/images/shapes/cookie.png";
import tree from "../../assets/images/shapes/tree.png";
import pear from "../../assets/images/shapes/pear.png";
import bananaTitle from "../../assets/images/shapes/banana-title.jpg";
import red_appleTitle from "../../assets/images/shapes/red_apple-title.png";
import green_appleTitle from "../../assets/images/shapes/green_apple-title.png";
import carTitle from "../../assets/images/shapes/car-title.png";
import birdTitle from "../../assets/images/shapes/bird-title.png";
import chocolateTitle from "../../assets/images/shapes/chocolate-title.png";
import candyTitle from "../../assets/images/shapes/candy-title.png";
import cookieTitle from "../../assets/images/shapes/cookie-title.png";
import treeTitle from "../../assets/images/shapes/tree-title.png";
import pearTitle from "../../assets/images/shapes/pear-title.png";
import "./Shape.css";

const ShapesList = [
  {
    id: 1,
    src: banana,
    src_title: bananaTitle,
    name: "banana",
  },
  {
    id: 2,
    src: red_apple,
    src_title: red_appleTitle,
    name: "red_apple",
  },
  {
    id: 3,
    src: green_apple,
    src_title: green_appleTitle,
    name: "green_apple",
  },
  {
    id: 4,
    src: car,
    src_title: carTitle,
    name: "car",
  },
  {
    id: 5,
    src: bird,
    src_title: birdTitle,
    name: "bird",
  },
  {
    id: 6,
    src: chocolate,
    src_title: chocolateTitle,
    name: "chocolate",
  },
  {
    id: 7,
    src: candy,
    src_title: candyTitle,
    name: "candy",
  },
  {
    id: 8,
    src: cookie,
    src_title: cookieTitle,
    name: "cookie",
  },
  {
    id: 9,
    src: tree,
    src_title: treeTitle,
    name: "tree",
  },
  {
    id: 10,
    src: pear,
    src_title: pearTitle,
    name: "pear",
  },
];

function Shape({ name, klasa, type }) {
  const picture = ShapesList.filter((shape) => {
    return name === shape.name;
  });

  const board = <img className={klasa} src={picture.map((picture) => picture.src)} />;
  const title = <img className={klasa} src={picture.map((picture) => picture.src_title)} />;

  return type === "board" ? board : title;
}

export default Shape;
