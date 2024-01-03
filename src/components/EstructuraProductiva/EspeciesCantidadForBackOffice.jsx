
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const EspeciesCantidadForBackOffice = ({ data }) => {

  console.log(data)
  const headerAlignProps = {
    headerAlign: 'center',
    align: 'center',
  };

  const columns = [
    { field: 'codigo', headerName: 'codigo', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'nombre', headerName: 'nombre', flex: 1, headerAlign: 'center', align: 'center' },
    { field: 'cantidad', headerName: 'cantidad', flex: 1, headerAlign: 'center', align: 'center' },
    // Agrega más columnas según sea necesario
  ];

  const rows = data.map((item) => ({
    id: item.id,
    codigo: item.especie.codigo,
    nombre: item.especie.nombre,
    cantidad: item.cantidad,
    // Agrega más propiedades según sea necesario
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default EspeciesCantidadForBackOffice;