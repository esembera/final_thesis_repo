import 'primeflex/primeflex.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-purple/theme.css'
import 'primereact/resources/primereact.css'
import {Menubar} from 'primereact/menubar'
import { ToastContext } from './Toast'
import { Toast } from 'primereact/toast'
import React, {useContext, useRef} from 'react';
import Main from './Components/Main'
import { AuthContext } from './Auth'
import { useHistory } from "react-router-dom";
import app from './base'
import { Button } from 'primereact/button'


const App = () => {

  const history = useHistory();

  const toastRef = useRef(null);


  const menuItems = [
		{
			label: 'Naslovnica',
			icon: 'pi pi-home',
			command: () => {
				navigateToPage('/')
			}
		},
		{
			label: 'Igre',
			icon: 'pi pi-book',
			items: [
				{
					label: 'Učenje brojeva',
					icon: 'pi pi-plus',
					command: () => {
						navigateToPage('/game-1')
					}
				},
				{
					label: 'Pregledaj oglase',
					icon: 'pi pi-bars',
					items: [
						{
							label: 'Usporedba brojeva',
							icon: 'pi pi-briefcase',
							command: () => {
								navigateToPage('/game-2')
							}
						},
						{
							label: 'Oglasi za zahtjeve',
							icon: 'pi pi-bookmark',
							command: () => {
								navigateToPage('/req')
							}
						}
					]
					
				}
			]
		}
	];

  const navigateToPage = (path) => {
		history.push(path);
	}



  const start = <img alt="logo" src="../../favicon.ico"
                height="40" className="mr-2 mb-0"
                style={{cursor: 'pointer'}}
                data-pr-tooltip="Početna stranica"
                onClick={() => history.push('/')}>
                  </img>

  const currentUser = useContext(AuthContext);
  console.log(currentUser)

  const login = <span>
    <Button label="Registracija" className="p-button-raised p-button-danger p-button-rounded mr-1"
			onClick={() => history.push('/register')}/>
    <Button label="Prijava" className="p-button-raised p-button-rounded " onClick={() => history.push('/login')}/>
  </span>

const logout = <span className="flex flex-row">
<Button label="Odjavi se" className="p-button-raised p-button-rounded" onClick={() => app.auth().signOut()}/>
				</span>


  return (
	  <ToastContext.Provider value={{toastRef}}>
		<Toast ref={toastRef}/>
		<div className="m-2">
					<Menubar className="mb-3" model={[...menuItems]} start={start} end={!!currentUser?.currentUser ? logout : login}/>
			<Main />
		</div>
	  </ToastContext.Provider>
  );
}

export default App;
