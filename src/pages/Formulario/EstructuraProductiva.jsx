import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton } from '@mui/material';
import BasicSelect from '../../components/Select';
import { orange } from '@mui/material/colors';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EspeciesCantidad from '../../components/EstructuraProductiva/EspeciesCantidad';
import EspeciesExistentes from '../../components/EstructuraProductiva/EspeciesExistentes';
import { useState, useEffect } from 'react';
import FormikSelect from '../../components/FormikSelect';

const sectorPredominante = [
  { value: 1, label: 'sector predominante 1' },
  { value: 2, label: 'sector predominante 2' },
  { value: 3, label: 'sector predominante 3' },
];

const tenenciaPredios = [
  { value: 1, label: 'tenencia de predios 1' },
  { value: 2, label: 'tenencia de predios 2' },
];

const comunaOptions = [
  { value: 1, label: 'Comuna 1' },
  { value: 2, label: 'Comuna 2' },
  { value: 3, label: 'Comuna 3' },
];

const validationSchema = Yup.object({
  sectorPredominante: Yup.string().required('Campo requerido'),
  tenenciaPredios: Yup.string().required('Campo requerido'),
  comuna: Yup.string().required('Campo requerido'),
  rol: Yup.string().required('Campo requerido'),
  principalesSocios: Yup.string().required('Campo requerido'),
});

export default function EstructuraProductiva() {

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedEspecies, setSelectedEspecies] = useState(null);

  useEffect(() => {
    console.log('Updated selectedEspecies:', selectedEspecies);
  }, [selectedEspecies]);

  const formik = useFormik({
    initialValues: {
      sectorPredominante: '',
      tenenciaPredios: '',
      comuna: '',
      rol: '',
      principalesSocios: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Aquí puedes manejar la lógica para enviar los datos del formulario.
      console.log('Formulario enviado:', values);
    },
  });


  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Typography variant="h6" gutterBottom>
          Estructura Productiva
        </Typography>
        <Button variant="contained" sx={{
          backgroundColor: orange[600],
          '&:hover': { backgroundColor: orange[700] },
          ml: 'auto',
        }}>
          Agregar
        </Button>
      </Box>
      <Accordion defaultExpanded={true} sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="structure-content"
          id="structure-n"
        >
          Estructura productiva 1
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FormikSelect
                    label="Sector Predominante"
                    name="sectorPredominante"
                    value={formik.values.sectorPredominante}
                    onChange={(e) => formik.setFieldValue("sectorPredominante", e.target.value)}
                    onBlur={formik.handleBlur}
                    error={formik.touched.sectorPredominante && Boolean(formik.errors.sectorPredominante)}
                    options={sectorPredominante}
                  />
                  <FormikSelect
                    label="Tenencia de Predios"
                    name="tenenciaPredios"
                    value={formik.values.tenenciaPredios}
                    onChange={(e) => formik.setFieldValue("tenenciaPredios", e.target.value)}
                    onBlur={formik.handleBlur}
                    error={formik.touched.tenenciaPredios && Boolean(formik.errors.tenenciaPredios)}
                    options={tenenciaPredios}
                  />
                  <FormikSelect
                    label="Comuna"
                    name="comuna"
                    value={formik.values.comuna}
                    onChange={(e) => formik.setFieldValue("comuna", e.target.value)}
                    onBlur={formik.handleBlur}
                    error={formik.touched.comuna && Boolean(formik.errors.comuna)}
                    options={comunaOptions}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="rol"
                  name="rol"
                  label="Rol"
                  fullWidth
                  variant="standard"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rol}
                  error={formik.touched.rol && Boolean(formik.errors.rol)}
                  helperText={formik.touched.rol && formik.errors.rol}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="principalesSocios"
                  name="principalesSocios"
                  label="Principales Socios"
                  fullWidth
                  multiline
                  rows={6}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.principalesSocios}
                  error={formik.touched.principalesSocios && Boolean(formik.errors.principalesSocios)}
                  helperText={formik.touched.principalesSocios && formik.errors.principalesSocios}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                  <EspeciesExistentes
                    arrayIds={selectedIds}
                    returnIdList={(idList) => {
                      setSelectedIds(() => {
                        return idList;
                      });
                    }}
                  />
                  <IconButton variant="contained" sx={{
                    backgroundColor: orange[600],
                    '&:hover': { backgroundColor: orange[700] },
                  }}>
                    <FileDownloadIcon />
                  </IconButton>
                  <EspeciesCantidad
                    arrayIds={selectedIds}
                    returnArrayIds={(idArrays) => {
                      setSelectedIds(idArrays);
                    }}
                    returnEspecies={(especies) => {
                      setSelectedEspecies(especies);
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Button type='submit' variant='outlined'>Enviar</Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}