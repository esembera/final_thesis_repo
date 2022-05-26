import React from "react";
import { useAuth } from "../Auth";
import { Card } from "primereact/card";
import usporedba from "../assets/images/thumbnails/usporedba.png";
import zbrajanje from "../assets/images/thumbnails/zbrajanje.png";
import brojanje from "../assets/images/thumbnails/brojanje.png";

const Home = () => {
  const footer = <h3 className="text-center">Svoje znanje možeš vježbati na jednoj od dolje ponuđenih igara:</h3>;

  return (
    <div>
      <div className="flex justify-content-center w-full">
        <Card footer={footer}>
          <h1 className="text-center">Dobrodošao na vježbalicu za predškolce!</h1>
        </Card>
      </div>
      <div className="flex justify-content-center">
        <div className="grid p-fluid">
          <div className="p-field lg:col-4 xl:col-4 sm: col-12">
            <h2 className="text-center">Brojalica</h2>
            <a href="/game-1">
              <img src={brojanje} />
            </a>
          </div>

          <div className="p-field lg:col-4 xl:col-4 sm: col-12">
            <h2 className="text-center">Usporedba brojeva</h2>
            <a href="/game-2">
              <img src={usporedba} />
            </a>
          </div>

          <div className="p-field lg:col-4 xl:col-4 sm: col-12">
            <h2 className="text-center">Zbrajalica</h2>
            <a href="/game-3">
              <img src={zbrajanje} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
