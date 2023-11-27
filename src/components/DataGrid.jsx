import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import { orange } from '@mui/material/colors';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

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
        // Puedes personalizar la acción según tus necesidades
        accion: (
          <IconButton variant="contained" sx={{
            backgroundColor: orange[600],
            '&:hover': { backgroundColor: orange[700] },
          }}>
            <FileDownloadIcon/>
          </IconButton>
        ),
      };

      rows.push(row);
    }

    const columns = [
      { field: 'id', headerName: 'ID', flex: 1, ...headerAlignProps },
      { field: 'especie', headerName: 'Especie', flex: 2, ...headerAlignProps },
      { 
        field: 'accion', 
        headerName: 'Acción', 
        flex: 2, 
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

export default function ColumnVirtualizationGrid() {
  const data = useData(100);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid {...data} />
    </div>
  );
}