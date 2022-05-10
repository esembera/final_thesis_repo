import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Auth";
import app from '../base'

const Home = () => {

    const history = useHistory();

    const currentUser = useContext(AuthContext);


    return (
        <div>
            <h1>Pozdrav</h1>
            {!!currentUser ? currentUser.currentUser?.multiFactor?.user?.email : null} <br />
        </div>
    )

}

export default Home;