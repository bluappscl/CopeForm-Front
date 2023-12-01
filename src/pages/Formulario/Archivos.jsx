import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import { useFormContext } from '../../context/FormContext';
import StepController from '../../components/Formulario/StepController';

export default function Archivos() {

  const { handleNext } = useFormContext();

  const buttonsData = [
    { title: "Carpeta Tributaria*", text: "Seleccionar Archivo" },
    { title: "Balances", text: "Seleccionar Archivo" },
    { title: "Contratos Arriendos", text: "Seleccionar Archivo" },
    { title: "Mandatos Especial/Poderes", text: "Seleccionar Archivo" },
    { title: "Otros", text: "Seleccionar Archivo" },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Encargado de Compra
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {buttonsData.map((button, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Typography variant="subtitle1" align="center">
              {button.title}
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: orange[600],
                '&:hover': { backgroundColor: orange[700] },
                mt: 1,
                width: '100%', // Hace que el botón ocupe todo el ancho del Grid item
              }}
            >
              {button.text}
            </Button>
          </Grid>
        ))}
      </Grid>
      <StepController />
    </React.Fragment>
  );
}