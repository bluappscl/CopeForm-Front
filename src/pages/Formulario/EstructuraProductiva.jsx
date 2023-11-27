import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton } from '@mui/material';
import BasicSelect from '../../components/Select';
import { orange } from '@mui/material/colors';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EspeciesCantidad from '../../components/EstructuraProductiva/EspeciesCantidad';
import EspeciesExistentes from '../../components/EstructuraProductiva/EspeciesExistentes';
import { useState } from 'react';

export default function EstructuraProductiva() {
  const [selectedEspecies, setSelectedEspecies] = useState([]);

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
                <BasicSelect label={"Sector Predominante"}></BasicSelect>
                <BasicSelect label={"Tenencia de Predios"}></BasicSelect>
                <BasicSelect label={"Comuna"}></BasicSelect>
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

            <Grid item xs={12} md={12}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                <EspeciesExistentes
                  returnIdList={(idList) => {
                    setSelectedEspecies(() => {
                      console.log(idList);
                      return idList;
                    });
                  }}
                />
                <IconButton variant="contained" sx={{
                  backgroundColor: orange[600],
                  '&:hover': { backgroundColor: orange[700] },
                }}>
                  <FileDownloadIcon />
                </IconButton>
                <EspeciesCantidad />
              </Box>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
}
