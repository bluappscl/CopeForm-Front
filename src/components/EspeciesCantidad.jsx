import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';


function useData(rowLength) {
  const [data, setData] = React.useState({ columns: [], rows: [] });

  const headerAlignProps = {
    headerAlign: 'center',
    align: 'center',
  };

  React.useEffect(() => {
    const rows = [];

    for (let i = 0; i < rowLength; i += 1) {
      const row = {
        id: i,
        especie: `Especie ${i}`,
        cantidad: Math.floor(Math.random() * 100) + 1,
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
      };

      rows.push(row);
    }

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
            onChange={(event) => {
              const newValue = parseInt(event.target.value, 10);
              const newData = [...data.rows];
              newData[params.rowIndex].cantidad = isNaN(newValue) ? 0 : newValue;
              setData((prevData) => ({ ...prevData, rows: newData }));
            }}
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

    setData({
      rows,
      columns,
    });
  }, [rowLength]);

  const handleAction = (id) => {
    // Lógica para manejar la acción según el ID
    console.log(`Acción realizada para el ID ${id}`);
  };

  return data;
}

export default function EspeciesCantidad() {
  const data = useData(100);

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
      <DataGrid {...data} localeText={localizedTextsMap} />
    </div>
  );
}