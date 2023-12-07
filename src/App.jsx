import * as React from 'react';
import { FormProvider } from './context/FormContext';
import Formulario from './pages/Formulario';
import { ThemeProvider } from '@emotion/react';

import logo from './assets/bgbg.png'
export default function App() {

    return (

        <FormProvider>
            <Formulario />
        </FormProvider>

    );
}