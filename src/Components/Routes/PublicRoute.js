import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
	return (
		// restricted = false meaning public route
		// restricted = true meaning restricted route
		<Route {...rest} render={props => (
			restricted ? <Redirect to="/"/> : <Component {...props} />
		)}/>
	);
};

export default PublicRoute;
