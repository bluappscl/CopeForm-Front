import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormHelperText, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
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
import EspeciesCantidadForBackOffice from '../../components/EstructuraProductiva/EspeciesCantidadForBackOffice';

const EstructuraProductiva = ({ formData }) => {
    const { handleNext, handleBack, clickedButton, especiesEstructura, formApplication } = useFormContext();


    const validationSchema = Yup.object().shape({
        estructuras: Yup.array().of(
            Yup.object().shape({
                sectorPredominante: Yup.string().required('Sector predominante es requerido'),
                tenenciaPredios: Yup.string().required('Tenencia de predios es requerida'),
                comuna: Yup.string().required('Comuna es requerida'),
                rol: Yup.string().required('Rol es requerido'),
                principalesClientes: Yup.string().required('Principales clientes es requerido'),
                especies: Yup.array().of(
                    Yup.object().shape({
                        cantidad: Yup.number().required('La cantidad es requerida').min(0, 'La cantidad no puede ser menor a cero'),
                    }).required('Especies no puede estar vacío')
                ).min(1, 'Al menos una especie debe ser seleccionada'), // Adjust the min value as needed
            })
        ),
    });

    // console.log("formEstructuraProductiva: ",formEstructuraProductiva.estructuras[0].especies);
    const initialValues = {
        estructuras: (formData?.estructuras || formApplication?.estructuras || []).map((estructura) => ({
            ...estructura,
        })),
    };

    // Si formEstructuraProductiva.estructuras está vacío, agrega una estructura vacía
    if (!formApplication?.estructuras?.length) {
        initialValues.estructuras.push({
            // Propiedades de la estructura vacía
            sectorPredominante: '',
            tenenciaPredios: '',
            comuna: '',
            rol: '',
            principalesClientes: '',
            especies: ''
        });
    }

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
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
                                                        principalesClientes: '',
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
                                                        displayEmpty
                                                    >
                                                        <MenuItem value="" disabled>
                                                            Sector predominante
                                                        </MenuItem>
                                                        <MenuItem value="1">Papas</MenuItem>
                                                        <MenuItem value="2">Comparito 2</MenuItem>
                                                        <MenuItem value="3">Compardium</MenuItem>
                                                    </Field>
                                                    <FormHelperText error={Boolean(errors.estructuras && errors.estructuras[index] && errors.estructuras[index].sectorPredominante)}>
                                                        {errors.estructuras && errors.estructuras[index] && errors.estructuras[index].sectorPredominante}
                                                    </FormHelperText>

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
                                                            Seleccione Sector
                                                        </MenuItem>
                                                        <MenuItem value="1">Arrendado</MenuItem>
                                                        <MenuItem value="2">Comparito 2</MenuItem>
                                                        <MenuItem value="3">Compardium</MenuItem>
                                                    </Field>
                                                    <FormHelperText error={Boolean(errors.estructuras && errors.estructuras[index] && errors.estructuras[index].tenenciaPredios)}>
                                                        {errors.estructuras && errors.estructuras[index] && errors.estructuras[index].tenenciaPredios}
                                                    </FormHelperText>

                                                    <Field
                                                        placeholder="Select Sector"
                                                        name={`estructuras.${index}.comuna`}
                                                        as={Select}
                                                        label={"wena comparitoo"}
                                                        fullWidth
                                                        variant="standard"
                                                        displayEmpty
                                                    >
                                                        <MenuItem value="" disabled>
                                                            Comuna
                                                        </MenuItem>
                                                        <MenuItem value="1">Lolol</MenuItem>
                                                        <MenuItem value="2">Comparito 2</MenuItem>
                                                        <MenuItem value="3">Compardium</MenuItem>
                                                    </Field>
                                                    <FormHelperText error={Boolean(errors.estructuras && errors.estructuras[index] && errors.estructuras[index].comuna)}>
                                                        {errors.estructuras && errors.estructuras[index] && errors.estructuras[index].comuna}
                                                    </FormHelperText>
                                                </Box>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12} md={6}>
                                                        <Field
                                                            sx={{ mt: 2 }}
                                                            name={`estructuras.${index}.rol`}
                                                            as={TextField}
                                                            label="Rol"
                                                            fullWidth
                                                            variant="standard"
                                                            error={Boolean(errors.estructuras?.[index]?.rol)}
                                                        // helperText={errors.estructuras?.[index]?.rol}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={12}>
                                                        <Field
                                                            name={`estructuras.${index}.principalesClientes`}
                                                            as={TextField}
                                                            label="Principales Clientes"
                                                            fullWidth
                                                            multiline
                                                            rows={6}
                                                            error={Boolean(errors.estructuras?.[index]?.principalesClientes)}
                                                        // helperText={errors.estructuras?.[index]?.principalesClientes}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', mt: 3 }}>

                                                    {!formData ? (
                                                        <>
                                                            <EspeciesExistentes
                                                                arrayIds={especiesEstructura[index] || []}
                                                                index={index}
                                                            />

                                                            <FileDownloadIcon />

                                                            <EspeciesCantidad
                                                                index={index}
                                                                returnEspecies={(especies) => (estructura.especies = especies)}
                                                            />

                                                        </>
                                                    ) : (
                                                        <EspeciesCantidadForBackOffice data={formData.estructuras[index].especiesEnEstructura} />
                                                    )}



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