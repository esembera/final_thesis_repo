import React from "react";
import { useAuth } from "../Auth";
import { Card } from "primereact/card";

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      <div className="flex justify-content-center w-full">
        <Card>
          <h1>Dobrodošao na vježbalicu za predškolce!</h1>
        </Card>
      </div>
      <h1>Pozdrav</h1>
      {!!currentUser ? currentUser.email : null} <br />
    </div>
  );
};

export default Home;
