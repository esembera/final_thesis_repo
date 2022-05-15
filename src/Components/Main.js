import React from 'react';
import Home from './Home';
import { Switch , Route } from 'react-router-dom'
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register'
import Error404 from './Error/Error404'
import Game1 from './Game1/Game1';
import Game2 from './Game2/Game2';


const Main = () => (

<main>
    <Switch>
        <Route exact path ="/" component={Home} />
        <Route exact path ="/login" component={Login}/>
        <Route exact path ="/register" component={Register}/>
        <Route exact path ="/game-1" component={Game1}/>
        <Route exact path ="/game-2" component={Game2}/>
        <Route component={Error404} />
    </Switch>
</main>
)

export default Main;