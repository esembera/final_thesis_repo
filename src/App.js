import 'primeflex/primeflex.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-purple/theme.css'
import 'primereact/resources/primereact.css'
import {Menubar} from 'primereact/menubar'
import PrimeReact from 'primereact/api'

import React, {useContext} from 'react';
import { AuthProvider } from './Auth';
import Main from './Components/Main'
import { AuthContext } from './Auth'
import { useHistory } from "react-router-dom";
import app from './base'


const App = () => {

  const history = useHistory();


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
					label: 'Dodaj novi oglas',
					icon: 'pi pi-plus',
					command: () => {
						navigateToPage('/new-ad')
					}
				},
				{
					label: 'Pregledaj oglase',
					icon: 'pi pi-bars',
					items: [
						{
							label: 'Oglasi za alat',
							icon: 'pi pi-briefcase',
							command: () => {
								navigateToPage('/advert')
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

  const login = <button onClick={() => history.push('/login')}> Prijavi se</button>
  const logout = <button onClick={() => app.auth().signOut()}> Odjavi se</button>


  return (
      <div className="m-2">
                  <Menubar className="mb-3" model={[...menuItems]} start={start} end={!!currentUser?.currentUser ? logout : login}/>
        <Main />
      </div>
  );
}

export default App;
