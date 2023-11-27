import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
import BasicSelect from '../../components/Select';

export default function EncargadoDeCompra() {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Encargado de Compra
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <BasicSelect label={"Tipo de Encargado"} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="rut"
                        name="rut"
                        label="Rut"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="fullname"
                        name="fullname"
                        label="Nombre Completo"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="phone"
                        name="phone"
                        label="Numero Telefónico"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="mail"
                        name="mail"
                        label="Correo Electrónico"
                        fullWidth
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
