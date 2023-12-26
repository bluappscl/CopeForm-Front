import * as React from 'react';
import { Field, Form, Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Button, FormHelperText, MenuItem, Select, TextField } from '@mui/material';
import { validate, clean, format, getCheckDigit } from 'rut.js'
import axiosInstance from '../../../axiosInstance';
import { useFormContext } from '../../context/FormContext';
import StepController from '../../components/Formulario/StepController';
import { useEffect } from 'react';
import { handleFormMove } from '../../utils/formUtils';



export default function Solicitante({ formData }) {
  const { handleNext, handleBack, clickedButton, formApplication } = useFormContext();

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
      .test('is-valid-rut', 'Ingrese un RUT válido', (value) => {
        const formatRut = format(value);
        return validate(formatRut);
      }),
    razonSocial: Yup.string().required('Requerido'),
    telefono: Yup.string()
      .required('Requerido')
      .matches(/^(?:\+569|9)\d{8}$/, 'Ingrese un número de teléfono válido'),
    correo: Yup.string().email('Correo electrónico inválido').required('Requerido'),
    region: Yup.string().required('Requerido'),
    comuna: Yup.string().required('Requerido'),
    calle: Yup.string().required('Requerido'),
    numeroDeCalle: Yup.string().required('Requerido'),
    giro: Yup.string().required('Requerido'),
    isEncargadoDeCompra: Yup.boolean(),
    cupo: Yup.number().required('Requerido'),
  });

  return (
    <Formik
      initialValues={{
        rut: '',
        razonSocial: '',
        telefono: '',
        correo: '',
        region: '',
        comuna: '',
        calle: '',
        numeroDeCalle: '',
        giro: '',
        isEncargadoDeCompra: false,
        cupo: '',
        ...formApplication,
        ...formData,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleFormMove(clickedButton, handleBack, handleNext, values)
      }}
    >
      {({ values, errors, handleChange, handleBlur }) => (
        <Form>
          <Typography variant="h6" gutterBottom>
            Solicitante
          </Typography >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Field
                required
                id="rut"
                name="rut"
                as={TextField}
                label="Rut"
                fullWidth
                variant="standard"
                value={values.rut}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.rut)}
                helperText={errors.rut}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                required
                id="razonSocial"
                name="razonSocial"
                as={TextField}
                label="Razón Social"
                fullWidth
                variant="standard"
                value={values.razonSocial}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.razonSocial)}
                helperText={errors.razonSocial}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                required
                id="telefono"
                name="telefono"
                as={TextField}
                label="Número Telefónico"
                fullWidth
                variant="standard"
                value={values.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.telefono)}
                helperText={errors.telefono}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                id="correo"
                name="correo"
                as={TextField}
                label="Correo Electrónico"
                fullWidth
                variant="standard"
                value={values.correo}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.correo)}
                helperText={errors.correo}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>Dirección Tributaria</Typography>
              <Box display={"flex"} flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    label={"Región"}
                    name="region"
                    value={values.region}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as={Select}
                    displayEmpty
                    error={Boolean(errors.region)}
                    fullWidth
                    variant="standard"
                  >
                    <MenuItem value="" disabled>
                      Región
                    </MenuItem>
                    {regionOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                  <FormHelperText error={Boolean(errors.region)}>
                    {errors.region}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>

                  <Field
                    label={"Comuna"}
                    name="comuna"
                    value={values.comuna}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    as={Select}
                    displayEmpty
                    error={Boolean(errors.comuna)}
                    fullWidth
                    variant="standard"
                  >
                    <MenuItem value="" disabled>
                      Comuna
                    </MenuItem>
                    {comunaOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                  <FormHelperText error={Boolean(errors.comuna)}>
                    {errors.comuna}
                  </FormHelperText>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={0} sm={6}></Grid>

            <Grid item xs={12} sm={6} gap={1}>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Field
                  required
                  id="calle"
                  name="calle"
                  as={TextField}
                  label="Calle"
                  fullWidth
                  variant="standard"
                  value={values.calle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.calle)}
                  helperText={errors.calle}
                />
                <Field
                  id="numeroDeCalle"
                  name="numeroDeCalle"
                  as={TextField}
                  label="Número"
                  variant="standard"
                  value={values.numeroDeCalle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.numeroDeCalle)}
                  helperText={errors.numeroDeCalle}
                  sx={{ ml: 4 }}
                />
              </Box>
            </Grid>

            <Grid item xs={0} sm={6}></Grid>

            <Grid item xs={12} sm={6}>
              <Field
                required
                id="giro"
                name="giro"
                as={TextField}
                label="Giro"
                fullWidth
                variant="standard"
                value={values.giro}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.giro)}
                helperText={errors.giro}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
              <Field type="checkbox" name="isEncargadoDeCompra">
                {({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="¿Tiene encargado de compra?"
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                required
                id="cupo"
                name="cupo"
                as={TextField}
                label="Cupo que necesita"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
                value={values.cupo}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.cupo)}
                helperText={errors.cupo}
              />
            </Grid>
          </Grid>
          {!formData && (
            <StepController />
          )}
        </Form>
      )}


    </Formik>
  );
}