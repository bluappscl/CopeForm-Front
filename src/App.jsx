import * as React from 'react';
import { FormProvider } from './context/FormContext';
import Formulario from './pages/Formulario';
import { ThemeProvider } from '@emotion/react';

import logo from './assets/bgbg.png'
import { Route, Routes } from 'react-router-dom';
import DetalleSolicitud from './pages/BackOffice/DetalleSolicitud';
import Login from './pages/Login';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import SolicitudesGenerales from './pages/BackOffice/SolicitudesGenerales';
export default function App() {
    return (
        <FormProvider>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/form' element={<Formulario />} />
                <Route path='/' element={<ResponsiveDrawer />}>
                    <Route path='/' element={<SolicitudesGenerales />} />
                    <Route path='/detalle/:id' element={<DetalleSolicitud />} />
                </Route>
            </Routes>
        </FormProvider>
    );
}