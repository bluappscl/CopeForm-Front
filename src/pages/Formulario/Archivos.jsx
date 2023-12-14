import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import { useFormContext } from '../../context/FormContext';
import StepController from '../../components/Formulario/StepController';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { handleFormMove } from '../../utils/formUtils';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const validateSize = (value) => {
  return !value || value.size <= (1024 * 1024 * 10);
}
const fileValidation = (fieldName) => {
  return Yup.mixed().test(
    'fileSize',
    `El archivo ${fieldName} debe ser menor a 10mb`,
    validateSize
  );
};

export default function Archivos() {



  const { handleNext, handleBack, clickedButton, formArchivos } = useFormContext();


  const printFiles = () => {
    console.log(formArchivos);
  }

  const validationSchema = Yup.object({
    carpetaTributaria: fileValidation('carpetaTributaria').required("Carpeta tributaria es obligatoria"),
    balances: fileValidation('balances'),
    contratoArriendos: fileValidation('contratoArriendos'),
    mandatosPoderes: fileValidation('mandatosPoderes'),
    otros: fileValidation('otros'),
  });

  const formik = useFormik({
    initialValues: {
      carpetaTributaria: null,
      balances: undefined,
      contratoArriendos: undefined,
      mandatosPoderes: undefined,
      otros: undefined,
      ...formArchivos
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleFormMove(clickedButton, handleBack, handleNext, values);
    }
  });

  const selectedFileMessage = (fileName) => {
    // const selectedFile = formik.values[fileName];
    // ${selectedFile.type.split('/')[1]}
    return formik.values[fileName]
      ? `Archivo seleccionado`
      : ''
  };

  const fileButtons = [
    { label: 'Carpeta Tributaria*', name: 'carpetaTributaria' },
    { label: 'Balances', name: 'balances' },
    { label: 'Contratos Arriendos', name: 'contratoArriendos' },
    { label: 'Mandatos Especial/Poderes', name: 'mandatosPoderes' },
    { label: 'Otros', name: 'otros' },
  ];

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Archivos
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {fileButtons.map((fileButton, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Typography variant="subtitle1" align="center">
                {fileButton.label}
              </Typography>
              <Button
                component="label"
                variant="contained"
                sx={{
                  backgroundColor: orange[600],
                  '&:hover': { backgroundColor: orange[700] },
                  mt: 1,
                  width: '100%',
                }}
                startIcon={<CloudUploadIcon />}
              >
                <VisuallyHiddenInput
                  id={fileButton.name}
                  name={fileButton.name}
                  type="file"
                  onChange={(event) => {
                    console.log(event.currentTarget.files[0]);
                    formik.setFieldValue(fileButton.name, event.currentTarget.files[0]);
                  }} />
                Seleccionar Archivo
              </Button>
              {selectedFileMessage(fileButton.name)}
              {formik.touched[fileButton.name] && formik.errors[fileButton.name] && (
                <div style={{ color: 'red' }}>{formik.errors[fileButton.name]}</div>
              )}
            </Grid>
          ))}
        </Grid>
        <StepController />
        {/* <Button onClick={() => printFiles()}>AAA</Button> */}
      </form>
    </React.Fragment>
  );
}