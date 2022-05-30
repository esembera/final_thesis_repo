import React from "react";
import "./Shape.css";
import ShapesList from "./ShapesList";

function Shape({ name, klasa, type }) {
  const picture = ShapesList.filter((shape) => {
    return name === shape.name;
  });

  const board = <img className={klasa} src={picture.map((picture) => picture.src)} />;
  const title = <img className={klasa} src={picture.map((picture) => picture.src_title)} />;

  return type === "board" ? board : title;
}

export default Shape;
