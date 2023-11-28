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
import Solicitante from './Formulario/Solicitante';
import EstructuraProductiva from '../pages/Formulario/EstructuraProductiva.jsx'
import PersonaJuridica from './Formulario/PersonaJuridica';
import EncargadoDeCompra from './Formulario/EncargadoDeCompra';
import Archivos from './Formulario/Archivos';


const steps = ['Solicitante', 'Estructura Productiva', 'Persona Jurídica', 'Encargado de Compra', 'Archivos'];

function getStepContent(step, next) {
  switch (step) {
    case 0:
      return <Solicitante handleNext={next} />;
    case 1:
      return <EstructuraProductiva handleNext={next} />;
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
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

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
                <StepLabel>{label}</StepLabel>
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
              {getStepContent(activeStep, handleNext)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Atras
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Enviar' : 'Continuar '}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}
