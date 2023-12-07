import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { orange, red } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import StepController from '../../components/Formulario/StepController';
import { useFormContext } from '../../context/FormContext';
import { handleFormMove } from '../../utils/formUtils';

const validationSchema = Yup.object().shape({
    personas: Yup.array().of(
        Yup.object().shape({
            rut: Yup.string().required('El Rut/Rep es requerido'),
            participation: Yup.string().required('La Participación es requerida'),
            phone: Yup.string().required('El Número telefónico es requerido'),
        })
    ),
});

const PersonaJuridica = () => {
    const { handleNext, handleBack, clickedButton, formPersonaJuridica } = useFormContext();

    return (
        <>
            <Formik
                initialValues={{
                    personas: [
                        {
                            rut: '',
                            participation: '',
                            phone: '',
                        },
                    ],
                    ...formPersonaJuridica
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values)
                    handleFormMove(clickedButton, handleBack, handleNext, values)
                }}
            >
                {({ values, errors }) => (
                    <Form>
                        <FieldArray
                            name="personas"
                            render={(arrayHelpers) => (
                                <>
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
                                            disabled={arrayHelpers.form.values.personas.length === 10}
                                            onClick={() => (
                                                arrayHelpers.push({
                                                    rut: '',
                                                    participation: '',
                                                    phone: '',
                                                }),
                                                console.log(arrayHelpers.form.values.personas.length))
                                            }
                                        >
                                            Agregar
                                        </Button>
                                    </Box>
                                    {values.personas.map((persona, index) => (
                                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, mt: 4 }} alignItems="center" key={index}>
                                            <Field
                                                name={`personas.${index}.rut`}
                                                as={TextField}
                                                label="Rut/Rep"
                                                fullWidth
                                                variant="standard"
                                                error={Boolean(errors.personas?.[index]?.rut)}
                                                helperText={errors.personas?.[index]?.rut}
                                            />
                                            <Field
                                                name={`personas.${index}.participation`}
                                                as={TextField}
                                                label="Participacion"
                                                fullWidth
                                                variant="standard"
                                                error={Boolean(errors.personas?.[index]?.participation)}
                                                helperText={errors.personas?.[index]?.participation}
                                            />
                                            <Field
                                                name={`personas.${index}.phone`}
                                                as={TextField}
                                                label="Numero telefónico"
                                                fullWidth
                                                variant="standard"
                                                error={Boolean(errors.personas?.[index]?.phone)}
                                                helperText={errors.personas?.[index]?.phone}
                                            />
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
                                        </Box>
                                    ))}
                                    <StepController />
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