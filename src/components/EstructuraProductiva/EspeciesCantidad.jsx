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

function EspeciesCantidad({ arrayIds, returnArrayIds, returnEspecies }) {
  const [especiesData, setEspeciesData] = useState({ columns: [], rows: [] });
  const [idList, setIdList] = useState([]);
  const [noEspeciesSelected, setNoEspeciesSelected] = useState(false); // Nuevo estado

  const headerAlignProps = {
    headerAlign: 'center',
    align: 'center',
  };

  useEffect(() => {
    setIdList(arrayIds);
    console.log("aaaa",idList)
  }, [arrayIds]);

  const removeId = (idToRemove) => {
    setIdList((prevIdList) => {
      const updatedIdList = prevIdList.filter((id) => id !== idToRemove);
      if (updatedIdList.length === 0) {
        setNoEspeciesSelected(true); // Informa que no hay especies seleccionadas
        returnArrayIds(updatedIdList);
      } else {
        setNoEspeciesSelected(false); // Reinicia el estado cuando se selecciona una especie
        returnArrayIds(updatedIdList);
      }
    });
  };

  const handleCantidadChange = (id, newValue) => {
    setEspeciesData((prevData) => {
      const updatedRows = prevData.rows.map((row) =>
        row.id === id ? { ...row, cantidad: newValue } : row
      );
      const newData = { ...prevData, rows: updatedRows };
      returnEspecies(newData.rows);
      return newData;
    });
  };

  useEffect(() => {
    if (arrayIds.length === 0) {
      setNoEspeciesSelected(true); // Informa que no hay especies seleccionadas
    } else {
      axiosInstance.post("/especies/byIds", { ids: [1,2] })
        .then((response) => {
          setNoEspeciesSelected(false); // Reinicia el estado cuando se obtienen especies
          const especies = response.data;

          const existingRows = especiesData.rows.filter(row => arrayIds.includes(row.id));

          const newRows = especies
            .filter(especie => !especiesData.rows.some(row => row.id === especie.id))
            .map((especie) => ({
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

          const updatedRows = [...existingRows, ...newRows];

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
            rows: updatedRows,
            columns,
          });

          // Llama a returnEspecies con los datos actualizados
          returnEspecies(updatedRows);

        })
        .catch((error) => {
          console.error('Error al obtener los datos de la API:', error);
        });
    }
  }, [arrayIds]);

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

export default EspeciesCantidad;