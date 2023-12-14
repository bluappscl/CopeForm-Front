import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import { useFormContext } from '../../context/FormContext';
import StepController from '../../components/Formulario/StepController';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { handleFormMove } from '../../utils/formUtils';


export default function ArchivosLinks() {
    const { handleNext, handleBack, clickedButton, formArchivos } = useFormContext();

    const fileButtons = [
        { label: 'Carpeta Tributaria*', name: 'carpetaTributaria' },
        { label: 'Balances', name: 'balances' },
        { label: 'Contratos Arriendos', name: 'contratoArriendos' },
        { label: 'Mandatos Especial/Poderes', name: 'mandatosPoderes' },
        { label: 'Otros', name: 'otros' },
    ];

    return (
        <React.Fragment>
            <form>
                <Typography variant="h6" gutterBottom>
                    Archivos
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {fileButtons.map((fileButton, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Typography variant="subtitle1" align="center">
                                {fileButton.label}
                            </Typography>
                            <Button
                                component="label"
                                variant="contained"
                                sx={{
                                    backgroundColor: orange[600],
                                    '&:hover': { backgroundColor: orange[700] },
                                    mt: 1,
                                    width: '100%',
                                }}
                                startIcon={<CloudUploadIcon />}
                            >
                                {fileButton.label} {/* Agregar el texto aquí */}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </form>
        </React.Fragment>
    );
}