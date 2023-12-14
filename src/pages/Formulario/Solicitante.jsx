import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button } from '@mui/material';
import { validate, clean, format, getCheckDigit } from 'rut.js'
import axiosInstance from '../../../axiosInstance';
import FormikSelect from '../../components/FormikSelect';
import { useFormContext } from '../../context/FormContext';
import StepController from '../../components/Formulario/StepController';
import { useEffect } from 'react';
import { handleFormMove } from '../../utils/formUtils';



export default function Solicitante({ formData }) {
  const { handleNext, formSolicitante, handleBack, clickedButton } = useFormContext();

  const regionOptions = [
    { value: 'TARAPACA', label: 'Tarapacá' },
    { value: 'ANTOFAGASTA', label: 'Antofagasta' },
    { value: 'ATACAMA', label: 'Atacama' },
    { value: 'COQUIMBO', label: 'Coquimbo' },
    { value: 'VALPARAISO', label: 'Valparaíso' },
    { value: 'LIB. GRAL. BDO. O\'HIGGINS', label: 'Libertador General Bernardo O\'Higgins' },
    { value: 'MAULE', label: 'Maule' },
    { value: 'BIOBIO', label: 'Biobío' },
    { value: 'ARAUCANIA', label: 'La Araucanía' },
    { value: 'LOS LAGOS', label: 'Los Lagos' },
    { value: 'AYSEN Y DEL GRAL CARLOS IBANEZ', label: 'Aysén del General Carlos Ibáñez del Campo' },
    { value: 'MAGALLANES Y LA ANTARTICA', label: 'Magallanes y de la Antártica Chilena' },
    { value: 'METROPOLITANA', label: 'Metropolitana' },
    { value: 'LOS RIOS', label: 'Los Ríos' },
    { value: 'ARICA Y PARINACOTA', label: 'Arica y Parinacota' },
    { value: 'NUBLE', label: 'Ñuble' },
  ];

  const comunaOptions = [
    { value: 'RANCAGUA', label: 'Rancagua' },
    { value: 'CODEGUA', label: 'Codegua' },
    { value: 'COINCO', label: 'Coinco' },
    { value: 'COLTAUCO', label: 'Coltauco' },
    { value: 'DOÑIHUE', label: 'Doñihue' },
    { value: 'GRANEROS', label: 'Graneros' },
    { value: 'LAS CABRAS', label: 'Las Cabras' },
    { value: 'MACHALÍ', label: 'Machalí' },
    { value: 'MALLOA', label: 'Malloa' },
    { value: 'MOSTAZAL', label: 'Mostazal' },
    { value: 'OLIVAR', label: 'Olivar' },
    { value: 'PEUMO', label: 'Peumo' },
    { value: 'PICHIDEGUA', label: 'Pichidegua' },
    { value: 'QUINTA DE TILCOCO', label: 'Quinta de Tilcoco' },
    { value: 'RENGO', label: 'Rengo' },
    { value: 'REQUÍNOA', label: 'Requínoa' },
    { value: 'SAN VICENTE', label: 'San Vicente' },
    { value: 'PICHILEMU', label: 'Pichilemu' },
    { value: 'LA ESTRELLA', label: 'La Estrella' },
    { value: 'LITUECHE', label: 'Litueche' },
    { value: 'MARCHIHUE', label: 'Marchihue' },
    { value: 'NAVIDAD', label: 'Navidad' },
    { value: 'PAREDONES', label: 'Paredones' },
    { value: 'SAN FERNANDO', label: 'San Fernando' },
    { value: 'CHÉPICA', label: 'Chépica' },
    { value: 'CHIMBARONGO', label: 'Chimbarongo' },
    { value: 'LOLOL', label: 'Lolol' },
    { value: 'NANCAGUA', label: 'Nancagua' },
    { value: 'PALMILLA', label: 'Palmilla' },
    { value: 'PERALILLO', label: 'Peralillo' },
    { value: 'PLACILLA', label: 'Placilla' },
    { value: 'PUMANQUE', label: 'Pumanque' },
    { value: 'SANTA CRUZ', label: 'Santa Cruz' },
  ];


  const validationSchema = Yup.object({
    rut: Yup.string()
      .required('Requerido')
      .test('is-valid-rut', 'Ingrese un RUT chileno válido', (value) => {
        // Limpia el RUT y utiliza rut.js para validar
        const formatRut = format(value);
        return validate(formatRut);
      }),
    razonSocial: Yup.string().required('Requerido'),
    telefono: Yup.string()
      .required('Requerido')
      .matches(/^(?:\+569|9)\d{8}$/, 'Ingrese un número de teléfono válido'),
    mail: Yup.string().email('Correo electrónico inválido').required('Requerido'),
    region: Yup.string().required('Requerido'),
    comuna: Yup.string().required('Requerido'),
    calle: Yup.string().required('Requerido'),
    numeroDeCalle: Yup.string().required('Requerido'),
    giro: Yup.string().required('Requerido'),
    isEncargadoDeCompra: Yup.boolean(),
    cupo: Yup.number().required('Requerido'),
  });

  const formik = useFormik({
    initialValues: {
      rut: '',
      razonSocial: '',
      telefono: '',
      mail: '',
      region: '',
      comuna: '',
      calle: '',
      numeroDeCalle: '',
      giro: '',
      isEncargadoDeCompra: false,
      cupo: '',
      ...formSolicitante,
      ...formData,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleFormMove(clickedButton, handleBack, handleNext, values)
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Solicitante
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="rut"
            name="rut"
            label="Rut"
            fullWidth
            variant="standard"
            value={formik.values.rut}
            onChange={formik.handleChange}
            error={formik.touched.rut && Boolean(formik.errors.rut)}
            helperText={formik.touched.rut && formik.errors.rut}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="razonSocial"
            name="razonSocial"
            label="Razón Social"
            fullWidth
            variant="standard"
            value={formik.values.razonSocial}
            onChange={formik.handleChange}
            error={formik.touched.razonSocial && Boolean(formik.errors.razonSocial)}
            helperText={formik.touched.razonSocial && formik.errors.razonSocial}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="telefono"
            name="telefono"
            label="Número Telefónico"
            fullWidth
            variant="standard"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            error={formik.touched.telefono && Boolean(formik.errors.telefono)}
            helperText={formik.touched.telefono && formik.errors.telefono}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="mail"
            name="mail"
            label="Correo Electrónico"
            fullWidth
            variant="standard"
            value={formik.values.mail}
            onChange={formik.handleChange}
            error={formik.touched.mail && Boolean(formik.errors.mail)}
            helperText={formik.touched.mail && formik.errors.mail}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>Dirección Tributaria</Typography>
          <Box display={"flex"} flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
            <FormikSelect
              label={"Región"}
              value={formik.values.region}
              onChange={(e) => formik.setFieldValue("region", e.target.value)}
              onBlur={formik.handleBlur}
              error={formik.touched.region && Boolean(formik.errors.region)}
              options={regionOptions}
            />
            <FormikSelect
              label={"Comuna"}
              value={formik.values.comuna}
              onChange={(e) => formik.setFieldValue("comuna", e.target.value)}
              onBlur={formik.handleBlur}
              error={formik.touched.comuna && Boolean(formik.errors.comuna)}
              options={comunaOptions}
            />
          </Box>
        </Grid>

        <Grid item xs={0} sm={6}></Grid>

        <Grid item xs={12} sm={6} gap={1}>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <TextField
              required
              id="calle"
              name="calle"
              label="Calle"
              fullWidth
              variant="standard"
              value={formik.values.calle}
              onChange={formik.handleChange}
              error={formik.touched.calle && Boolean(formik.errors.calle)}
              helperText={formik.touched.calle && formik.errors.calle}
            />
            <TextField
              id="numeroDeCalle"
              name="numeroDeCalle"
              label="Número"
              variant="standard"
              sx={{ ml: 4 }}
              value={formik.values.numeroDeCalle}
              onChange={formik.handleChange}
              error={formik.touched.numeroDeCalle && Boolean(formik.errors.numeroDeCalle)}
              helperText={formik.touched.numeroDeCalle && formik.errors.numeroDeCalle}
            />
          </Box>
        </Grid>

        <Grid item xs={0} sm={6}></Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="giro"
            name="giro"
            label="Giro"
            fullWidth
            variant="standard"
            value={formik.values.giro}
            onChange={formik.handleChange}
            error={formik.touched.giro && Boolean(formik.errors.giro)}
            helperText={formik.touched.giro && formik.errors.giro}
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
          <FormControlLabel
            control={
              <Checkbox
                name="isEncargadoDeCompra"
                checked={formik.values.isEncargadoDeCompra}
                onChange={formik.handleChange}
              />
            }
            label="¿Tiene encargado de compra?"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cupo"
            name="cupo"
            label="Cupo que necesita"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            value={formik.values.cupo}
            onChange={formik.handleChange}
            error={formik.touched.cupo && Boolean(formik.errors.cupo)}
            helperText={formik.touched.cupo && formik.errors.cupo}
          />
        </Grid>
      </Grid>
      {!formData && (
        <StepController />
      )}
    </form>
  );
}