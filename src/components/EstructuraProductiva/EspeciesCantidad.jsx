import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';

function EspeciesCantidad({ arrayIds, returnArrayIds, returnEspecies }) {
  const [especiesData, setEspeciesData] = useState({ columns: [], rows: [] });
  const [idList, setIdList] = useState([]);

  const headerAlignProps = {
    headerAlign: 'center',
    align: 'center',
  };

  useEffect(() => {
    setIdList(arrayIds);
  }, [arrayIds]);

  const removeId = (idToRemove) => {
    setIdList((prevIdList) => {
      const updatedIdList = prevIdList.filter((id) => id !== idToRemove);
      if (updatedIdList.length === 0) {
        alert('El array no puede estar vacío.');
      } else {
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
    axiosInstance.post("/especies/byIds", { ids: arrayIds })
      .then((response) => {
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
        <DataGrid {...especiesData} localeText={localizedTextsMap} />
    </div>
  );
}

export default EspeciesCantidad;