import React from "react";
import { useAuth } from "../Auth";

const Home = () => {

    const { currentUser } = useAuth()

    return (
        <div>
            <h1>Pozdrav</h1>
            {!!currentUser ? currentUser.email : null} <br />
        </div>
    )

}

export default Home;