import React, { createContext, useContext, useEffect, useState } from 'react';
import { format } from 'rut.js'

const FormContext = createContext();

export const FormProvider = ({ children }) => {

  const [formApplication, setFormApplication] = useState({
    tipo: 'Persona',
    estructuras: [
      {
        region: '',
        comuna: '',
        especies: [
        ],
        principalesClientes: '',
        rol: '',
        sectorPredominante: '',
        tenenciaPredios: '',
      },
    ],
  }
  );

  const [stepsLength, setStepsLength] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [clickedButton, setClickedButton] = useState(null);

  const [especiesEstructura, setEspeciesEstructura] = useState([]);

  const updateStepsLength = (steps) => {
    setStepsLength(steps.length)
  }

  const updateByPosition = (values) => {
    switch (activeStep) {
      case 0:
        updateFormAplication(values);
        break;
      case 1:
        updateFormAplication(values);
        break;
      case 2:
        updateFormAplication(values);
        break;
      case 3:
        updateFormAplication(values);
        break;
      case 4:
        updateFormAplication(values);
        break;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleButtonClick = (buttonName) => {
    setClickedButton(buttonName);
  };

  const handleNext = (values) => {
    updateByPosition(values);
    setActiveStep((prevStep) => {
      if (!formApplication.isEncargadoDeCompra && formApplication.tipo === 'Empresa' && prevStep === 2) {
        return prevStep + 2;
      } else if (formApplication.isEncargadoDeCompra && formApplication.tipo === 'Persona' && prevStep === 1) {
        return prevStep + 2;
      } else if (!formApplication.isEncargadoDeCompra && formApplication.tipo === 'Persona' && prevStep === 1) {
        return prevStep + 3;
      } else {
        return prevStep + 1;
      }
    });
  };

  const handleBack = (values) => {
    updateByPosition(values);
    setActiveStep((prevStep) => {
      if (!formApplication.isEncargadoDeCompra && formApplication.tipo === 'Empresa' && prevStep === 4) {
        return prevStep - 2;
      } else if (formApplication.isEncargadoDeCompra && formApplication.tipo === 'Persona' && prevStep === 3) {
        return prevStep - 2;
      } else if (!formApplication.isEncargadoDeCompra && formApplication.tipo === 'Persona' && prevStep === 4) {
        return prevStep - 3;
      } else {
        return prevStep - 1;
      }
    });
  };

  const updateFormAplication = (newData) => {
    setFormApplication((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const updateEspeciesEstructura = (newData) => {
    console.log("newData dentro de contexto: ", newData)
    setEspeciesEstructura((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  useEffect(() => {
    console.log("Form Aplication: ", formApplication);
  }, [formApplication]);

  useEffect(() => {
    console.log("Active step: ", activeStep);
  }, [activeStep]);

  useEffect(() => {
    console.log("Steps Length: ", stepsLength);
  }, [stepsLength]);

  useEffect(() => {
    console.log("Button Name: ", clickedButton);
  }, [clickedButton]);

  const formState = {
    activeStep,
    handleBack,
    handleNext,
    updateStepsLength,
    stepsLength,
    clickedButton,
    handleButtonClick,
    updateEspeciesEstructura,
    especiesEstructura,
    formApplication,
    updateFormAplication,
    setEspeciesEstructura,
  };

  return (
    <FormContext.Provider value={formState}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(FormContext);
};