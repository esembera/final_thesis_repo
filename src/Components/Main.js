import React from 'react';
import Home from './Home';
import { Switch , Route } from 'react-router-dom'
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register'
import Error404 from './Error/Error404'
import Game1 from './Game1/Game1';
import Game2 from './Game2/Game2';
import PublicRoute from './Routes/PublicRoute';
import PrivateRoute from './Routes/PrivateRoute';
import Game3 from './Game3/Game3';


const Main = () => (

<main>
    <Switch>
        <PublicRoute exact path ="/" component={Home} />
        <PublicRoute exact path ="/login" component={Login}/>
        <PublicRoute exact path ="/register" component={Register}/>
        <PrivateRoute exact path ="/game-1" component={Game1}/>
        <PrivateRoute exact path ="/game-2" component={Game2}/>
        <PrivateRoute exact path ="/game-3" component={Game3}/>
        <PublicRoute component={Error404} />
    </Switch>
</main>
)

export default Main;