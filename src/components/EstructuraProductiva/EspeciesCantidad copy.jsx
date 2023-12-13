import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import { useFormContext } from '../../context/FormContext';

function EspeciesCantidad3({ returnEspecies }) {
  const [especiesData, setEspeciesData] = useState({ columns: [], rows: [] });
  const [noEspeciesSelected, setNoEspeciesSelected] = useState(false); // Nuevo estado

  const { especiesEstructura, updateEspeciesEstructura } = useFormContext();

  const headerAlignProps = {
    headerAlign: 'center',
    align: 'center',
  };

  const removeId = (idToRemove) => {
    setEspeciesData((prevData) => {
      const updatedRows = prevData.rows.filter((row) => row.id !== idToRemove);
      const newData = { ...prevData, rows: updatedRows };
      returnEspecies(updatedRows);
      setNoEspeciesSelected(updatedRows.length === 0); // Update noEspeciesSelected state
      return newData;
    });
  };

  const handleCantidadChange = (id, newValue) => {
    setEspeciesData((prevData) => {
      const updatedRows = prevData.rows.map((row) =>
        row.id === id ? { ...row, cantidad: newValue } : row
      );
      const newData = { ...prevData, rows: updatedRows };
      returnEspecies(updatedRows);
      return newData;
    });
  };

  useEffect(() => {
    const rows = especiesEstructura.map((especie) => ({
      id: especie.id,
      especie: especie.nombre, 
      cantidad: "",
      accion: (
        <IconButton
          sx={{
            backgroundColor: red[600],
            '&:hover': { backgroundColor: red[700] },
          }}
          onClick={() => removeId(especie.id)}
        >
          <ClearIcon fontSize='small' sx={{ color: "white" }}></ClearIcon>
        </IconButton>
      ),
    }));

    const columns = [
      { field: 'id', headerName: 'ID', flex: 1, ...headerAlignProps },
      { field: 'especie', headerName: 'Especie', flex: 2, ...headerAlignProps },
      {
        field: 'cantidad',
        headerName: 'Cantidad',
        flex: 2,
        ...headerAlignProps,
        renderCell: (params) => (
          <TextField
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            value={params.value}
            onChange={(e) => handleCantidadChange(params.id, e.target.value)}
          />
        ),
      },
      {
        field: 'accion',
        headerName: 'Acción',
        flex: 1,
        ...headerAlignProps,
        renderCell: (params) => params.value,
      },
    ];

    setEspeciesData({
      rows,
      columns,
    });

    // Call returnEspecies with the initial data
    returnEspecies(rows);
  }, [especiesEstructura]);

  const localizedTextsMap = {
    columnMenuUnsort: "Desordenar",
    columnMenuSortAsc: "Ordenar Ascendente",
    columnMenuSortDesc: "Ordenar Descendente",
    columnMenuFilter: "Filtrar",
    columnMenuHideColumn: "Ocultar",
    columnMenuShowColumns: "Mostrar Columnas",
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      {noEspeciesSelected ? (
        <Paper sx={{
          display: 'flex',
          width: '100%',
          height: '300px',
          alignContent: 'center',
          justifyContent: 'center',
        }}
        >
          <Typography variant='h4' sx={{ my: 'auto' }}>
            Seleccione Especies
          </Typography>
        </Paper>
      ) : (
        <DataGrid {...especiesData} localeText={localizedTextsMap} />
      )}
    </div>
  );
}

export default EspeciesCantidad3;