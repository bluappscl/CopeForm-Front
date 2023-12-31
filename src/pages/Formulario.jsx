import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Copyright from '../components/Copyright';
import EstructuraProductiva from '../pages/Formulario/EstructuraProductiva.jsx'
import PersonaJuridica from './Formulario/PersonaJuridica.jsx';
import EncargadoDeCompra from './Formulario/EncargadoDeCompra';
import Archivos from './Formulario/Archivos';
import { useFormContext } from '../context/FormContext.jsx';
import { useFormik } from 'formik';
import StepController from '../components/Formulario/StepController.jsx';
import { useEffect } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import axiosInstance from '../../axiosInstance.js';
import Solicitante from './Formulario/Solicitante.jsx';
import { useState } from 'react';


const steps = ['Solicitante', 'Estructura Productiva', 'Persona Jurídica', 'Encargado de Compra', 'Archivos'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Solicitante />;
    case 1:
      return <EstructuraProductiva />;
    case 2:
      return <PersonaJuridica />;
    case 3:
      return <EncargadoDeCompra />;
    case 4:
      return <Archivos />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Formulario() {
  const { activeStep, updateStepsLength, formApplication, stepsLength, updateFormAplication } = useFormContext();

  const [isIntention, setIsIntention] = useState(false)

  const uploadFiles = (formId) => {
    const formData = new FormData()

    const addFileToFormData = (file, fieldName) => {
      file && formData.append(fieldName, file);
    };

    formData.append('formId', formId)

    addFileToFormData(formApplication.archivos.carpetaTributaria, 'Carpeta Tributaria');
    addFileToFormData(formApplication.archivos.balances, 'Balances');
    addFileToFormData(formApplication.archivos.contratoArriendos, 'Contrato Arriendos');
    addFileToFormData(formApplication.archivos.mandatosPoderes, 'Mandatos Poderes');
    addFileToFormData(formApplication.archivos.otros, 'Otros');

    axiosInstance.post('/upload', formData)
      .then((response) => {
        const data = response;
      })
      .catch((error) => {
        console.error('Error al subir archivos:', error);
      });
  }

  useEffect(() => {
    updateStepsLength(steps)
  }, [steps])

  useEffect(() => {
    if (activeStep === stepsLength) {

      // SUBE EL FORMULARIO UNA VEZ LLEGA AL PASO FINAL
      axiosInstance.put("forms/createNewFormFilled", formApplication)
        .then((response) => {
          const data = response.data;
          uploadFiles(data.form.id)
        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
        });

    }

    if (activeStep === 1 && isIntention === false) {
      axiosInstance.post("forms/create", formApplication)
        .then((response) => {
          const data = response.data;
          updateFormAplication({ formId: data.id })
          setIsIntention(true)
        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
        });

    }
  }, [activeStep, stepsLength]);


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Copeform
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Solicitud de Credito
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
            {steps.map((label, index) => (
              <Step key={label} sx={{ flex: '1' }}>
                <StepLabel
                  icon={
                    index === 2 && formApplication.tipo === 'Persona'
                      ? <CancelIcon />
                      : index === 3 ? (formApplication.isEncargadoDeCompra ? '4' : <CancelIcon />)
                        : index + 1
                  }
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Solicitud enviada con exito.
              </Typography>
              <Typography variant="subtitle1">
                Hemos recibido tu solicitud correctamente, nos
                comunicaremos contigo cuando tu solicitud haya sido revisada.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>

              {getStepContent(activeStep, steps.length)}

            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
