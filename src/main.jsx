import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Formulario from './pages/Formulario';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Formulario />
  </React.StrictMode>,
)
