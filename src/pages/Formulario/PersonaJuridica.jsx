import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { orange, red } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';

export default function PersonaJuridica() {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h6" gutterBottom>
          Persona
        </Typography>
        <Button variant="contained" sx={{
          backgroundColor: orange[600],
          '&:hover': { backgroundColor: orange[700] },
          ml: 'auto',
        }}>
          Agregar
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 3, mt:4}} alignItems="center">
        <TextField
          required
          id="rut"
          name="rut"
          label="Rut/Rep"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          id="participation"
          name="participation"
          label="Participacion"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          id="phone"
          name="phone"
          label="Numero telefónico"
          fullWidth
          variant="standard"
        />
        <IconButton
          sx={{
            backgroundColor: red[600],
            '&:hover': { backgroundColor: red[700] },
          }}
        >
          <ClearIcon fontSize='small' sx={{color:"white"}}></ClearIcon>
        </IconButton>
      </Box>

    </React.Fragment>
  );
}
