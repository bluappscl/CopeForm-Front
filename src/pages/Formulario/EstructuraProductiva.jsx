import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { orange, red } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import StepController from '../../components/Formulario/StepController';
import { useFormContext } from '../../context/FormContext';
import { handleFormMove } from '../../utils/formUtils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EspeciesExistentes from '../../components/EstructuraProductiva/EspeciesExistentes';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EspeciesCantidad from '../../components/EstructuraProductiva/EspeciesCantidad';
import EspeciesCantidad2 from '../../components/EstructuraProductiva/EspeciesCantidad2';
import EspeciesCantidad3 from '../../components/EstructuraProductiva/EspeciesCantidad copy';
import EspeciesCantidad2copy from '../../components/EstructuraProductiva/EspeciesCantidad2 copy';

const validationSchema = Yup.object().shape({
    personas: Yup.array().of(
        Yup.object().shape({
            rut: Yup.string().required('El Rut/Rep es requerido'),
            participation: Yup.string().required('La Participación es requerida'),
            phone: Yup.string().required('El Número telefónico es requerido'),
        })
    ),
});

const EstructuraProductiva = ({ formData }) => {
    const { handleNext, handleBack, clickedButton, formEstructuraProductiva, especiesEstructura, updateEspeciesEstructura } = useFormContext();

    const prinIds = () => {
        console.log(formEstructuraProductiva);
    }
    // console.log("formEstructuraProductiva: ",formEstructuraProductiva.estructuras[0].especies);
    const initialValues = {
        estructuras: (formData?.estructuras || formEstructuraProductiva?.estructuras || []).map((estructura) => ({
            ...estructura,
        })),
    };

    // Si formEstructuraProductiva.estructuras está vacío, agrega una estructura vacía
    if (!formEstructuraProductiva?.estructuras?.length) {
        initialValues.estructuras.push({
            // Propiedades de la estructura vacía
            sectorPredominante: '',
            tenenciaPredios: '',
            comuna: '',
            rol: '',
            principalesSocios: ''
        });
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values)
                    handleFormMove(clickedButton, handleBack, handleNext, values)
                }}
            >
                {({ values, errors }) => (
                    <Form>
                        <FieldArray
                            name="estructuras"
                            render={(arrayHelpers) => (
                                <>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Typography variant="h6" gutterBottom>
                                            Estructura Productiva
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
                                                // disabled={arrayHelpers.form.values.personas.length === 10}
                                                onClick={() => (
                                                    arrayHelpers.push({
                                                        sectorPredominante: '',
                                                        tenenciaPredios: '',
                                                        comuna: '',
                                                        rol: '',
                                                        principalesSocios: '',
                                                        especies: '',
                                                    })
                                                )}
                                            >
                                                Agregar
                                            </Button>
                                        )}
                                        {/* <Button variant='outlined' onClick={() => prinIds()}>Imprimir Especies</Button> */}
                                    </Box>


                                    {values.estructuras.map((estructura, index) => (
                                        // console.log(estructura),
                                        <Accordion defaultExpanded={index === 0} sx={{ mt: 2, py: 1 }} key={index}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="structure-content"
                                                id="structure-n"
                                            >
                                                Estructura productiva {index + 1}
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: { xs: 'column', md: 'row' },
                                                        gap: 2,
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        spacing: 3,
                                                    }}
                                                >
                                                    <Field
                                                        placeholder="Select Sector"
                                                        name={`estructuras.${index}.sectorPredominante`}
                                                        as={Select}
                                                        label={"wena comparitoo"}
                                                        fullWidth
                                                        variant="standard"
                                                    >
                                                        <MenuItem value="1">Papas</MenuItem>
                                                        <MenuItem value="2">Comparito 2</MenuItem>
                                                        <MenuItem value="3">Compardium</MenuItem>
                                                    </Field>
                                                    <Field
                                                        placeholder="Select Sector"
                                                        name={`estructuras.${index}.tenenciaPredios`}
                                                        as={Select}
                                                        label={"wena comparitoo"}
                                                        fullWidth
                                                        variant="standard"
                                                        displayEmpty
                                                    >
                                                        <MenuItem value="" disabled>
                                                            Select Sector
                                                        </MenuItem>
                                                        <MenuItem value="1">Arrendado</MenuItem>
                                                        <MenuItem value="2">Comparito 2</MenuItem>
                                                        <MenuItem value="3">Compardium</MenuItem>
                                                    </Field>
                                                    <Field
                                                        placeholder="Select Sector"
                                                        name={`estructuras.${index}.comuna`}
                                                        as={Select}
                                                        label={"wena comparitoo"}
                                                        fullWidth
                                                        variant="standard"
                                                    >
                                                        <MenuItem value="1">Lolol</MenuItem>
                                                        <MenuItem value="2">Comparito 2</MenuItem>
                                                        <MenuItem value="3">Compardium</MenuItem>
                                                    </Field>
                                                </Box>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} md={6}>
                                                        <Field
                                                            name={`estructuras.${index}.rol`}
                                                            as={TextField}
                                                            label="Rol"
                                                            fullWidth
                                                            variant="standard"
                                                            error={Boolean(errors.estructuras?.[index]?.rol)}
                                                            helperText={errors.estructuras?.[index]?.rol}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Field
                                                            name={`estructuras.${index}.principalesSocios`}
                                                            as={TextField}
                                                            label="PrincipalesSocios"
                                                            fullWidth
                                                            multiline
                                                            rows={6}
                                                            error={Boolean(errors.estructuras?.[index]?.principalesSocios)}
                                                            helperText={errors.estructuras?.[index]?.principalesSocios}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', mt: 3 }}>
                                                    <EspeciesExistentes
                                                        arrayIds={especiesEstructura[index] || []}
                                                        index={index}
                                                    />

                                                    <FileDownloadIcon />

                                                    {/* <EspeciesCantidad
                                                        arrayIds={selectedIds[index] || []}
                                                        returnEspecies={(especies) => (estructura.especies = especies)}
                                                        returnArrayIds={(idArrays) => handleIdsChange(index, idArrays)}

                                                    /> */}
                                                    {/* 
                                                    <EspeciesCantidad2
                                                        index={index}
                                                        returnEspecies={(especies) => (estructura.especies = especies)}
                                                    /> */}

                                                    {/* <EspeciesCantidad3 index={index} returnEspecies={(especies) => (estructura.especies = especies)} /> */}


                                                    <EspeciesCantidad2copy
                                                        index={index}
                                                        returnEspecies={(especies) => (estructura.especies = especies)}
                                                    />
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>
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

export default EstructuraProductiva;