import 'primeflex/primeflex.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primereact/resources/themes/lara-light-purple/theme.css'
import 'primereact/resources/primereact.css'
import PrimeReact from 'primereact/api'

import React from 'react';
import { AuthProvider } from './Auth';
import Main from './Components/Main'


const App = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
