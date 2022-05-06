import React from 'react';
import Home from './Home';
import { Switch , Route } from 'react-router-dom'
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register'


const Main = () => (

<main>
    <Switch>
        <Route exact path ="/" component={Home} />
        <Route exact path ="/login" component={Login}/>
        <Route exact path ="/register" component={Register}/>
    </Switch>
</main>
)

export default Main;