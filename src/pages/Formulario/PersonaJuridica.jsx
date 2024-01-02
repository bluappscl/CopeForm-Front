import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { orange, red } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import StepController from '../../components/Formulario/StepController';
import { useFormContext } from '../../context/FormContext';
import { handleFormMove } from '../../utils/formUtils';
import { useEffect } from 'react';
import { format, validate } from 'rut.js';
import InputAdornment from '@mui/material/InputAdornment';

const validationSchema = Yup.object().shape({
    personasJuridicas: Yup.array().of(
        Yup.object().shape({
            rut: Yup.string()
                .required('Requerido')
                .test('is-valid-rut', 'Ingrese un RUT chileno válido', (value) => {
                    const formatRut = format(value);
                    return validate(formatRut);
                }),
            participacion: Yup.number().required('La Participación es requerida'),
            telefono: Yup.string()
                .required('Requerido')
                .matches(/^(?:\+569|9)\d{8}$/, 'Ingrese un número de teléfono válido'),
        })
    ),
});

const PersonaJuridica = ({ formData }) => {
    const { handleNext, handleBack, clickedButton, formApplication } = useFormContext();


    return (
        <>
            <Formik
                initialValues={{
                    personasJuridicas: [
                        {
                            rut: '',
                            participacion: '',
                            telefono: '',
                            tipo: '',
                        },
                    ],
                    ...formData,
                    ...formApplication,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    let participacionTotal = 0.0;
                    values.personasJuridicas.map((persona) => {
                        participacionTotal = participacionTotal + parseInt(persona.participacion);
                        persona.rut = format(persona.rut)
                        if ((parseInt(persona.rut.substring(0, 2), 10)) > 50) {
                            persona.tipo = "Empresa"
                        } else {
                            persona.tipo = "Persona"
                        }
                    })
                    if (participacionTotal > 100 || participacionTotal < 1) {
                        console.log("participacionTotal: ", participacionTotal)

                        alert("La participación total debe estar entre 0.01 y 0.1");
                        return;
                    }

                    //HAY QUE ARREGLAR ESTA VALIDACION Y ANALIZAR POR QUE NO DUNCIONA.
                    handleFormMove(clickedButton, handleBack, handleNext, values)
                }}
            >
                {({ values, errors }) => (
                    <Form>
                        <FieldArray
                            name="personasJuridicas"
                            render={(arrayHelpers) => (
                                <>
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <Typography variant="h6" gutterBottom>
                                            Persona
                                        </Typography>
                                        {!formData && (
                                            <Button
                                                type="button"
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: orange[600],
                                                    '&:hover': { backgroundColor: orange[700] },
                                                    ml: 'auto',
                                                }}
                                                disabled={arrayHelpers.form.values.personasJuridicas.length === 10}
                                                onClick={() => (
                                                    arrayHelpers.push({
                                                        rut: '',
                                                        participacion: '',
                                                        telefono: '',
                                                        tipo: '',
                                                    })
                                                )}
                                            >
                                                Agregar
                                            </Button>
                                        )}
                                    </Box>
                                    {values.personasJuridicas.map((persona, index) => (
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, mt: 4 }} alignItems="center" key={index}>
                                            <Field
                                                name={`personasJuridicas.${index}.rut`}
                                                as={TextField}
                                                label="Rut/Rep"
                                                fullWidth
                                                variant="standard"
                                                error={Boolean(errors.personasJuridicas?.[index]?.rut)}
                                                helperText={errors.personasJuridicas?.[index]?.rut}
                                            />
                                            <Field
                                                name={`personasJuridicas.${index}.participacion`}
                                                as={TextField}
                                                label="Participacion"
                                                fullWidth
                                                variant="standard"
                                                error={Boolean(errors.personasJuridicas?.[index]?.participacion)}
                                                helperText={errors.personasJuridicas?.[index]?.participacion}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                                }}
                                            />
                                            <Field
                                                name={`personasJuridicas.${index}.telefono`}
                                                as={TextField}
                                                label="Numero telefónico"
                                                fullWidth
                                                variant="standard"
                                                error={Boolean(errors.personasJuridicas?.[index]?.telefono)}
                                                helperText={errors.personasJuridicas?.[index]?.telefono}
                                            />



                                            {!formData && (

                                                <IconButton
                                                    type="button"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                    sx={{
                                                        backgroundColor: red[600],
                                                        '&:hover': { backgroundColor: red[700] },
                                                    }}
                                                >
                                                    <ClearIcon fontSize="small" sx={{ color: 'white' }}></ClearIcon>
                                                </IconButton>
                                            )}
                                        </Box>
                                    ))}
                                    {!formData && (
                                        <StepController />
                                    )}
                                </>
                            )}
                        />
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default PersonaJuridica;