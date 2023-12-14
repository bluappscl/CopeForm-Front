import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Button, TextField, Typography, Grid, Select, MenuItem } from '@mui/material';
import * as Yup from 'yup';
import { orange, red } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import StepController from '../../components/Formulario/StepController';
import { useFormContext } from '../../context/FormContext';
import { handleFormMove } from '../../utils/formUtils';

const validationSchema = Yup.object().shape({
    encargadoCompra: Yup.array().of(
        Yup.object().shape({
            tipoEncargado: Yup.string().required('Campo requerido'),
            rut: Yup.string().required('Campo requerido'),
            fullname: Yup.string().required('Campo requerido'),
            phone: Yup.string().required('Campo requerido'),
            mail: Yup.string().email('Correo electrónico no válido').required('Campo requerido'),
        })
    ),
});

const EncargadoDeCompra = ({ formData }) => {
    const { handleNext, handleBack, clickedButton, formEncargadoDeCompra } = useFormContext();

    return (
        <Formik
            initialValues={{
                encargadoCompra: [
                    {
                        tipoEncargado: '',
                        rut: '',
                        fullname: '',
                        phone: '',
                        mail: '',
                    },
                ],
                ...formData,
                ...formEncargadoDeCompra,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log(values);
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
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Field
                                name="encargadoCompra[0].tipoEncargado"
                                as={Select}
                                label="Tipo de Encargado"
                                fullWidth
                                variant="standard"
                                error={Boolean(errors.encargadoCompra?.[0]?.tipoEncargado)}
                                helperText={errors.encargadoCompra?.[0]?.tipoEncargado}
                                displayEmpty
                                sx={{ mt: 2 }}
                            >
                                <MenuItem value="" disabled>
                                    Tipo de encargado
                                </MenuItem>
                                <MenuItem value={1}>
                                    Valor 1
                                </MenuItem>
                            </Field>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                name="encargadoCompra[0].rut"
                                as={TextField}
                                label="Rut"
                                fullWidth
                                variant="standard"
                                error={Boolean(errors.encargadoCompra?.[0]?.rut)}
                                helperText={errors.encargadoCompra?.[0]?.rut}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                name="encargadoCompra[0].fullname"
                                as={TextField}
                                label="Nombre Completo"
                                fullWidth
                                variant="standard"
                                error={Boolean(errors.encargadoCompra?.[0]?.fullname)}
                                helperText={errors.encargadoCompra?.[0]?.fullname}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                name="encargadoCompra[0].phone"
                                as={TextField}
                                label="Numero Telefónico"
                                fullWidth
                                variant="standard"
                                error={Boolean(errors.encargadoCompra?.[0]?.phone)}
                                helperText={errors.encargadoCompra?.[0]?.phone}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Field
                                name="encargadoCompra[0].mail"
                                as={TextField}
                                label="Correo Electrónico"
                                fullWidth
                                variant="standard"
                                error={Boolean(errors.encargadoCompra?.[0]?.mail)}
                                helperText={errors.encargadoCompra?.[0]?.mail}
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
};

export default EncargadoDeCompra;