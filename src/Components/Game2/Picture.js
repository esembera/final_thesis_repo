import React from "react";
import { useDrag } from "react-dnd";

function Picture({ src, id, style }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return <img ref={drag} className={style} style={{ border: isDragging ? "1px solid black" : "0px" }} src={src} />;
}

export default Picture;
