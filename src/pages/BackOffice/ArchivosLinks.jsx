import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useFormContext } from '../../context/FormContext';
import { Link } from 'react-router-dom';

export default function ArchivosLinks({ archivos }) {
    const { handleNext, handleBack, clickedButton, formArchivos } = useFormContext();

    const handleDownload = (url) => {
        // Agregar lógica para descargar el archivo desde la URL
        console.log(`Descargando archivo desde: ${url}`);
        // Puedes utilizar window.location.href o alguna librería de manejo de descargas
    };

    return (
        <React.Fragment>
            <form>
                <Typography variant="h6" gutterBottom>
                    Archivos
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {archivos.map((archivo, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Typography variant="subtitle1" align="center">
                                {archivo.tipo}
                            </Typography>
                            <Link to={archivo.url}>

                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: orange[600],
                                        '&:hover': { backgroundColor: orange[700] },
                                        mt: 1,
                                        width: '100%',
                                    }}
                                    startIcon={<CloudDownloadIcon />}
                                    // onClick={() => handleDownload(archivo.url)}
                                >
                                    Descargar
                                </Button>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </form>
        </React.Fragment>
    );
}