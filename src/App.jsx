import * as React from 'react';
import { FormProvider } from './context/FormContext';
import Formulario from './pages/Formulario';
import { ThemeProvider } from '@emotion/react';

import logo from './assets/bgbg.png'
import { Route, Routes } from 'react-router-dom';
import BackOffice from './pages/BackOffice/BackOffice';
export default function App() {
    return (
        <FormProvider>
            <Routes>
                <Route path='/form' element={
                    <Formulario />
                } />

                <Route path='/b' element={<BackOffice />} />
            </Routes>
        </FormProvider>
    );
}