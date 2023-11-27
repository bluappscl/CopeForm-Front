import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';
import { useState } from 'react';

function EspeciesCantidad() {
  const [especiesData, setEspeciesData] = useState({ columns: [], rows: [] });
  const [selectedIds, setSelectedIds] = useState([2, 3]);

  const headerAlignProps = {
    headerAlign: 'center',
    align: 'center',
  };

  useEffect(() => {
    const requestData = {selectedIds};
    axiosInstance.get("/especies/byIds", requestData  )
      .then((response) => {
        const especies = response.data;
        console.log(especies);

        const rows = especies.map((especie) => ({
          id: especie.id,
          especie: especie.nombre,
          cantidad: 0,
          accion: (
            <IconButton
              sx={{
                backgroundColor: red[600],
                '&:hover': { backgroundColor: red[700] },
              }}
            >
              <ClearIcon fontSize='small' sx={{ color: "white" }}></ClearIcon>
            </IconButton>
          ),
        }))

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

      })
      .catch((error) => {
        console.error('Error al obtener los datos de la API:', error);
      });

  }, []);

  const handleAction = (id) => {
    // Lógica para manejar la acción según el ID
    console.log(`Acción realizada para el ID ${id}`);
  };


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