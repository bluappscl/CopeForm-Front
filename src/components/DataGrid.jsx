import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';

function useData(rowLength) {
  const [data, setData] = React.useState({ columns: [], rows: [] });

  React.useEffect(() => {
    const rows = [];

    for (let i = 0; i < rowLength; i += 1) {
      const row = {
        id: i,
        nombre: `Nombre ${i}`,
        cantidad: Math.floor(Math.random() * 100) + 1, // Cantidad aleatoria para ejemplo
      };

      rows.push(row);
    }

    const columns = [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'nombre', headerName: 'Nombre', width: 200 },
      { field: 'cantidad', headerName: 'Cantidad', width: 150 },
    ];

    setData({
      rows,
      columns,
    });
  }, [rowLength]);

  return data;
}

export default function ColumnVirtualizationGrid() {
  const data = useData(100);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid {...data} checkboxSelection />
    </div>
  );
}