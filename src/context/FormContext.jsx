import React, { createContext, useContext, useEffect, useState } from 'react';
import { format } from 'rut.js'

const FormContext = createContext();

export const FormProvider = ({ children }) => {

  const [formApplication, setFormApplication] = useState({
    estructuras: [
      {
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
        values.cupo = parseInt(values.cupo);
        values.rut = format(values.rut);
        updateFormAplication(values);
        break;
      case 1:
        updateFormAplication(values);
        break;
      case 2:
        console.log("VALUES: ", values.personas)
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
    setActiveStep(
      (formApplication.isEncargadoDeCompra === false && activeStep === 2) ?
        activeStep + 2 :
        activeStep + 1
    );
  };

  const handleBack = (values) => {
    updateByPosition(values);
    setActiveStep(
      (formApplication.isEncargadoDeCompra === false && activeStep === 4) ?
        activeStep - 2 :
        activeStep - 1
    );
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