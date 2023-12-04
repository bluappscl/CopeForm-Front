import React from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import { orange, red } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import StepController from '../../components/Formulario/StepController';
import { useFormContext } from '../../context/FormContext';
import { handleFormMove } from '../../utils/formUtils';

const PersonaJuridica = () => {

  const { clickedButton, handleBack, handleNext, formPersonaJuridica,  } = useFormContext();

  const validationSchema = Yup.object({
    rut: Yup.string().required('Requerido'),
    participation: Yup.string().required('Requerido'),
    phone: Yup.string().required('Requerido')
  });

  const formik = useFormik({
    initialValues: {
      rut: '',
      participation: '',
      phone: '',
      ...formPersonaJuridica,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFormMove(clickedButton, handleBack, handleNext, values)
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography variant="h6" gutterBottom>
          Persona
        </Typography>
        <Button
          type="button"
          variant="contained"
          sx={{
            backgroundColor: orange[600],
            '&:hover': { backgroundColor: orange[700] },
            ml: 'auto',
          }}
        >
          Agregar
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, mt: 4 }} alignItems="center">
        <Typography>Index</Typography>
        <TextField
          required
          id="rut"
          name="rut"
          label="Rut/Rep"
          fullWidth
          variant="standard"
          {...formik.getFieldProps('rut')}
        />
        <TextField
          required
          id="participation"
          name="participation"
          label="Participacion"
          fullWidth
          variant="standard"
          {...formik.getFieldProps('participation')}
        />
        <TextField
          required
          id="phone"
          name="phone"
          label="Numero telefónico"
          fullWidth
          variant="standard"
          {...formik.getFieldProps('phone')}
        />
        <IconButton
          type="button"
          onClick={() => {
            // Puedes agregar lógica para eliminar el elemento si es necesario
          }}
          sx={{
            backgroundColor: red[600],
            '&:hover': { backgroundColor: red[700] },
          }}
        >
          <ClearIcon fontSize="small" sx={{ color: 'white' }}></ClearIcon>
        </IconButton>
      </Box>
      <StepController />
    </form>
  );
};

export default PersonaJuridica;