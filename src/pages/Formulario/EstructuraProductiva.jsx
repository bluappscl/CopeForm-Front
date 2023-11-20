import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button } from '@mui/material';
import BasicSelect from '../../components/Select';
import { orange } from '@mui/material/colors';

export default function EstructuraProductiva() {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h6" gutterBottom>
          Estructura Productiva
        </Typography>
        <Button variant="contained" sx={{
          backgroundColor: orange[600],
          '&:hover': { backgroundColor: orange[700] },
          ml: 'auto',
        }}>
          Agregar
        </Button>
      </Box>
      <Accordion defaultExpanded={true} sx={{ mt: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="structure-content"
          id="structure-n"
        >
          Estructura productiva 1
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BasicSelect></BasicSelect>
                <BasicSelect></BasicSelect>
                <BasicSelect></BasicSelect>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="rol"
                name="rol"
                label="Rol"
                fullWidth
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                id="socios"
                label="Princiáles Socios"
                fullWidth
                multiline
                rows={6}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
