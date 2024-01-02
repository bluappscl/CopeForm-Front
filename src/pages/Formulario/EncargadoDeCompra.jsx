import React from 'react';
import { Formik, Field, FieldArray, Form } from 'formik';
import { Box, Typography, Grid, Select, MenuItem, FormHelperText } from '@mui/material';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import StepController from '../../components/Formulario/StepController';
import { useFormContext } from '../../context/FormContext';
import { handleFormMove } from '../../utils/formUtils';
import { format, validate } from 'rut.js';

const validationSchema = Yup.object().shape({
    encargadosDeCompra: Yup.array().of(
        Yup.object().shape({
            tipoEncargado: Yup.string().required('Campo requerido'),
            rut: Yup.string()
                .required('Requerido')
                .test('is-valid-rut', 'Ingrese un RUT válido', (value) => {
                    const formatRut = format(value);
                    return validate(formatRut);
                }),
            nombre: Yup.string().required('Campo requerido'),
            telefono: Yup.string()
                .required('Requerido')
                .matches(/^(?:\+569|9)\d{8}$/, 'Ingrese un número de teléfono válido'),
            correo: Yup.string().email('Correo electrónico no válido').required('Campo requerido'),
        })
    ),
});

const EncargadoDeCompra = ({ formData }) => {
    const { handleNext, handleBack, clickedButton, formApplication } = useFormContext();

    return (
        <Formik
            initialValues={{
                encargadosDeCompra: [
                    {
                        tipoEncargado: '',
                        rut: '',
                        nombre: '',
                        telefono: '',
                        correo: '',
                    },
                ],
                ...formApplication,
                ...formData,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
                values.encargadosDeCompra.map((encargado) => {
                    encargado.rut = format(encargado.rut)
                })
                handleFormMove(clickedButton, handleBack, handleNext, values);
            }}
        >
            {({ values, errors }) => (
                <Form>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography variant="h6" gutterBottom>
                            Encargado de Compra
                        </Typography>
                    </Box>
                    <FieldArray
                        name="encargadosDeCompra"
                        render={(arrayHelpers) => (
                            <Grid container spacing={3} alignItems="center">
                                {values.encargadosDeCompra.map((encargado, index) => (
                                    <React.Fragment key={index}>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name={`encargadosDeCompra.${index}.tipoEncargado`}
                                                as={Select}
                                                label="Tipo de Encargado"
                                                fullWidth
                                                variant="standard"
                                                error={Boolean(errors.encargadosDeCompra?.[index]?.tipoEncargado)}
                                                displayEmpty
                                                sx={{ mt: 2 }}
                                            >
                                                <MenuItem value="" disabled>
                                                    Tipo de encargado
                                                </MenuItem>
                                                <MenuItem value={1}>Valor 1</MenuItem>
                                                <MenuItem value={2}>Valor 2</MenuItem>
                                            </Field>
                                            <FormHelperText error={Boolean(errors.encargadosDeCompra?.[index]?.tipoEncargado)}>
                                                {errors.encargadosDeCompra?.[index]?.tipoEncargado}
                                            </FormHelperText>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name={`encargadosDeCompra.${index}.rut`}
                                                as={TextField}
                                                label="Rut"
                                                fullWidth
                                                variant="standard"
                                                error={Boolean(errors.encargadosDeCompra?.[index]?.rut)}
                                                helperText={errors.encargadosDeCompra?.[index]?.rut}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name={`encargadosDeCompra.${index}.nombre`}
                                                as={TextField}
                                                label="Nombre Completo"
                                                fullWidth
                                                variant="standard"
                                                error={Boolean(errors.encargadosDeCompra?.[index]?.nombre)}
                                                helperText={errors.encargadosDeCompra?.[index]?.nombre}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name={`encargadosDeCompra.${index}.telefono`}
                                                as={TextField}
                                                label="Numero Telefónico"
                                                fullWidth
                                                variant="standard"
                                                error={Boolean(errors.encargadosDeCompra?.[index]?.telefono)}
                                                helperText={errors.encargadosDeCompra?.[index]?.telefono}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                name={`encargadosDeCompra.${index}.correo`}
                                                as={TextField}
                                                label="Correo Electrónico"
                                                fullWidth
                                                variant="standard"
                                                error={Boolean(errors.encargadosDeCompra?.[index]?.correo)}
                                                helperText={errors.encargadosDeCompra?.[index]?.correo}
                                            />
                                        </Grid>
                                    </React.Fragment>
                                ))}
                            </Grid>
                        )}
                    />
                    {!formData && <StepController />}
                </Form>
            )}
        </Formik>
    );
};

export default EncargadoDeCompra;