import * as React from 'react';
import { FormProvider } from './context/FormContext';
import Formulario from './pages/Formulario';

export default function App() {

    return (
        <FormProvider>
            <Formulario />
        </FormProvider>
    );
}