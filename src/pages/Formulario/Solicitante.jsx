import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';
import BasicSelect from '../../components/Select';

export default function Solicitante() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Solicitante
      </Typography>
      <Grid container spacing={3}>
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
            id="rsocial"
            name="rsocial"
            label="Razon Social"
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
            id="mail"
            name="mail"
            label="Correo Electrónico"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>Direccion Tributaria</Typography>
          <Box display={"flex"} flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
            <BasicSelect label={"Region"}></BasicSelect>
            <BasicSelect label={"Comuna"}></BasicSelect>
          </Box>
        </Grid>

        <Grid item xs={0} sm={6}></Grid>

        <Grid item xs={12} sm={6} gap={1}>
          <Box sx={{display:"flex", flexDirection:"row"}}>
            <TextField
              required
              id="street"
              name="street"
              label="Calle"
              fullWidth
              variant="standard"
            />
            <TextField
              id="snumber"
              name="snumber"
              label="Numero"
              variant="standard"
              sx={{ ml: 4 }}
            />
          </Box>
        </Grid>

        <Grid item xs={0} sm={6}></Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="transfer"
            name="transfer"
            label="Giro"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'flex-end' }}>
          <FormControlLabel control={<Checkbox />} label="Tiene encargado de compra?" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="creditLimit"
            name="creditLimit"
            label="Cupo que necesita"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
