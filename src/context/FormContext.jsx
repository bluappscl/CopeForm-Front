import React, { createContext, useContext, useEffect, useState } from 'react';
import { format } from 'rut.js'

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formSolicitante, setFormSolicitante] = useState({});
  const [formEstructuraProductiva, setFormEstructuraProductiva] = useState({});
  const [formPersonaJuridica, setFormPersonaJuridica] = useState({});
  const [formEncargadoDeCompra, setFormEncargadoDeCompra] = useState({});
  const [formArchivos, setFormArchivos] = useState({});

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
        updateFormSolicitante(values);
        break;
      case 1:
        updateFormEstructuraProductiva(values);
        break;
      case 2:
        updateFormPersonaJuridica(values);
        break;
      case 3:
        updateFormEncargadoDeCompra(values);
        break;
      case 4:
        updateFormArchivos(values);
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
      (formSolicitante.isEncargadoDeCompra === false && activeStep === 2) ?
        activeStep + 2 :
        activeStep + 1
    );
  };

  const handleBack = (values) => {
    updateByPosition(values);
    setActiveStep(
      (formSolicitante.isEncargadoDeCompra === false && activeStep === 4) ?
        activeStep - 2 :
        activeStep - 1
    );
  };


  const updateFormSolicitante = (newData) => {
    setFormSolicitante((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const updateFormEstructuraProductiva = (newData) => {
    setFormEstructuraProductiva((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const updateFormPersonaJuridica = (newData) => {
    setFormPersonaJuridica((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const updateFormEncargadoDeCompra = (newData) => {
    setFormEncargadoDeCompra((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const updateFormArchivos = (newData) => {
    setFormArchivos((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const updateEspeciesEstructura = (newData) => {
    setEspeciesEstructura((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  useEffect(() => {
    console.log("Solcitante: ", formSolicitante);
  }, [formSolicitante]);

  useEffect(() => {
    console.log("Estructura: ", formEstructuraProductiva);
  }, [formEstructuraProductiva]);

  useEffect(() => {
    console.log("PersonaJuridica: ", formPersonaJuridica);
  }, [formPersonaJuridica]);

  useEffect(() => {
    console.log("Encargado de Compra: ", formEncargadoDeCompra);
  }, [formEncargadoDeCompra]);

  useEffect(() => {
    console.log("Archivos: ", formArchivos);
  }, [formArchivos]);

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
    formSolicitante,
    formEstructuraProductiva,
    formPersonaJuridica,
    formEncargadoDeCompra,
    formArchivos,
    updateFormArchivos,
    activeStep,
    handleBack,
    handleNext,
    updateStepsLength,
    stepsLength,
    clickedButton,
    handleButtonClick,
    updateEspeciesEstructura,
    especiesEstructura,
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