import React, { useContext } from "react";
import { AuthContext } from "../Auth";

const Home = () => {

    const currentUser = useContext(AuthContext);


    return (
        <div>
            <h1>Pozdrav</h1>
            {!!currentUser ? currentUser.currentUser?.multiFactor?.user?.email : null} <br />
        </div>
    )

}

export default Home;