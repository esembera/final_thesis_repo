import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Auth";
import app from '../base'

const Home = () => {

    const history = useHistory();

    const currentUser = useContext(AuthContext);

    const login = <button onClick={() => history.push('/login')}> Prijavi se</button>
    const logout = <button onClick={() => app.auth().signOut()}> Odjavi se</button>

    console.log(currentUser.currentUser)

    return (
        <div>
            <h1>Pozdrav</h1>
            {!!currentUser ? currentUser.currentUser?.multiFactor?.user?.email : null} <br />
            {!!currentUser.currentUser ? logout : login}
        </div>
    )

}

export default Home;