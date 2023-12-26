import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import TablaSolicitudes from '../../components/SolicitudesGenerales/TablaSolicitudes';


export default function SolicitudesGenerales() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                }}
            >
                <Container maxWidth="x-lg" sx={{ mt: 10, mb: 4 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography component="h2" variant="h6" color="black" gutterBottom>Lista de Solicitudes</Typography>
                            <TablaSolicitudes />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}