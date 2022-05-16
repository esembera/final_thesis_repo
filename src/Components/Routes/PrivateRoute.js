import React, {useContext, useEffect, useRef} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AuthContext} from '../../Auth';
import {ToastContext} from '../../Toast';

const PrivateRoute = ({requireAdmin, component: Component, ...rest}) => {
	const {currentUser} = useContext(AuthContext);
	const {toastRef} = useContext(ToastContext);

	useEffect(() => {
		if (!currentUser) {
			toastRef.current.show({
				severity: 'info', summary: 'Potrebna prijava',
				detail: 'Za pristup toj komponenti trebate se prijaviti'
			});
		}
	}, [toastRef, currentUser]);

	return (
		<Route {...rest} render={props => {
			return (
				!!currentUser ?
					<Component {...props} />
					: <Redirect to="/login"/>
			);
		}}/>
	);
};

export default PrivateRoute;
