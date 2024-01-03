import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, FormHelperText, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
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
import { comunaOptions, sectorPredominante, tenenciaPredios } from '../../utils/normalizedData';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import Swal from 'sweetalert2';

const EstructuraProductiva = ({ formData }) => {
    const { handleNext, handleBack, clickedButton, especiesEstructura, formApplication, setEspeciesEstructura } = useFormContext();

    const eliminarArrayYResetearPosiciones = (objeto, indice) => {
        // Verifica si hay un array en la posición indicada
        if (objeto[indice]) {
            // Convierte el objeto a un array de pares clave-valor
            const arrayDeObjeto = Object.entries(objeto);
            // Elimina el elemento en la posición indicada
            arrayDeObjeto.splice(indice, 1);

            // Crea un nuevo objeto con claves numéricas consecutivas
            let nuevoObjeto = arrayDeObjeto.reduce((obj, [clave, valor], index) => {
                obj[index] = valor;
                return obj;
            }, {});

            // Actualiza especiesEstructura con el nuevo objeto
            setEspeciesEstructura(nuevoObjeto)

        } else {
            // Muestra un mensaje de error si no hay un array en la posición indicada
            console.error(`No hay un array en la posición ${indice}`);
        }
    }

    const validationSchema = Yup.object().shape({
        estructuras: Yup.array().of(
            Yup.object().shape({
                sectorPredominante: Yup.string().required('Sector predominante es requerido'),
                tenenciaPredios: Yup.string().required('Tenencia de predios es requerida'),
                comuna: Yup.string().required('Comuna es requerida'),
                rol: Yup.string()
                    .required('Rol es requerido')
                    .matches(/^[A-Za-z]+-[A-Za-z]+$/, 'El formato de rol debe ser XX-XX.'),
                principalesClientes: Yup.string().required('Principales clientes es requerido'),
                // especies: Yup.array().of(
                //     Yup.object().shape({
                //         cantidad: Yup.number().required('La cantidad es requerida').min(0, 'La cantidad no puede ser menor a cero'),
                //     }).required('Especies no puede estar vacío')
                // ).min(1, 'Al menos una especie debe ser seleccionada'), // Adjust the min value as needed
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
                    let cantidadValidation = false;
                    values.estructuras.map((estructura, index) => {
                        const especies = estructura.especies
                        console.log("especiesespeciesespecies: ", especies)
                        if (especies.length === 0) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Especies requeridas',
                                html: `<span style="color: ${orange[900]};">Estructura ${index + 1}</span> debe tener almenos una especie.`,
                            });
                            cantidadValidation = true
                        }
                        especies.map((especie) => {
                            console.log(especie)
                            if (!especie.cantidad || especie.cantidad <= 0) {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Se necesita una cantidad valida',
                                    html: `La especie <span style="color: ${orange[900]};">${especie.nombre}</span> en <span style="color: ${orange[900]};">Estructura ${index + 1}</span> debe tener una cantidad valida.`,
                                });
                                cantidadValidation = true;
                                return;
                            }
                        })
                    })
                    if (!cantidadValidation) {
                        handleFormMove(clickedButton, handleBack, handleNext, values)
                    }
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
                                                    <Box display={'flex'} flexDirection={'column'} width={'100%'}>

                                                        <Field
                                                            placeholder="Sector Predominante"
                                                            name={`estructuras.${index}.sectorPredominante`}
                                                            as={Select}
                                                            label={"Sector Predominante"}
                                                            fullWidth
                                                            variant="standard"
                                                            displayEmpty
                                                        >
                                                            <MenuItem value="" disabled>
                                                                Sector Predominante
                                                            </MenuItem>
                                                            {sectorPredominante.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Field>
                                                        <FormHelperText error={Boolean(errors.estructuras && errors.estructuras[index] && errors.estructuras[index].sectorPredominante)}>
                                                            {errors.estructuras && errors.estructuras[index] && errors.estructuras[index].sectorPredominante}
                                                        </FormHelperText>
                                                    </Box>
                                                    <Box display={'flex'} flexDirection={'column'} width={'100%'}>

                                                        <Field
                                                            placeholder="Tenencia de Predios"
                                                            name={`estructuras.${index}.tenenciaPredios`}
                                                            as={Select}
                                                            label={"Tenencia de Predios"}
                                                            fullWidth
                                                            variant="standard"
                                                            displayEmpty
                                                        >
                                                            <MenuItem value="" disabled>
                                                                Tenencia de Predios
                                                            </MenuItem>
                                                            {tenenciaPredios.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </Field>
                                                        <FormHelperText error={Boolean(errors.estructuras && errors.estructuras[index] && errors.estructuras[index].tenenciaPredios)}>
                                                            {errors.estructuras && errors.estructuras[index] && errors.estructuras[index].tenenciaPredios}
                                                        </FormHelperText>
                                                    </Box>
                                                    <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                                                        <Field
                                                            placeholder="Comuna"
                                                            name={`estructuras.${index}.comuna`}
                                                            as={Select}
                                                            label={"Comuna"}
                                                            fullWidth
                                                            variant="standard"
                                                            displayEmpty
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
                                                        <FormHelperText error={Boolean(errors.estructuras && errors.estructuras[index] && errors.estructuras[index].comuna)}>
                                                            {errors.estructuras && errors.estructuras[index] && errors.estructuras[index].comuna}
                                                        </FormHelperText>
                                                    </Box>
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
                                                            helperText={errors.estructuras?.[index]?.rol}
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
                                                            helperText={errors.estructuras?.[index]?.principalesClientes}
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

                                                            <IconButton variant="contained" sx={{
                                                                backgroundColor: orange[600],
                                                                '&:hover': { backgroundColor: orange[700] },
                                                            }}
                                                            >
                                                                <SwapVertIcon fontSize='large' />
                                                            </IconButton>

                                                            <EspeciesCantidad
                                                                index={index}
                                                                returnEspecies={(especies) => (estructura.especies = especies)}
                                                            />
                                                            <Button
                                                                type="button"
                                                                onClick={() => {
                                                                    eliminarArrayYResetearPosiciones(especiesEstructura, index)
                                                                    arrayHelpers.remove(index)
                                                                }}
                                                                sx={{
                                                                    marginRight: "auto",
                                                                    backgroundColor: red[600],
                                                                    '&:hover': { backgroundColor: red[700] },
                                                                }}
                                                                variant='contained'
                                                            >
                                                                <ClearIcon fontSize="small" sx={{ color: 'white', border: 'black' }} />

                                                                Eliminar Estructura

                                                            </Button>
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