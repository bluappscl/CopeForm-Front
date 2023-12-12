import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormContext } from '../../context/FormContext';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';

const headerAlignProps = {
  headerAlign: 'center',
  align: 'center',
};

const EspeciesCantidad2 = ({ index, returnEspecies }) => {
  const { especiesEstructura, updateEspeciesEstructura } = useFormContext();
  const [especies, setEspecies] = useState(especiesEstructura[index] || []);

  useEffect(() => {
    returnEspecies(especies);
  }, [especiesEstructura]);

  const handleCantidadChange = (id, newValue) => {
    const parsedValue = parseInt(newValue, 10) || 0;

    const nuevoArray = especies.map((especie) =>
      especie.id === id ? { ...especie, cantidad: parsedValue } : especie
    );

    setEspecies(nuevoArray);
    updateEspeciesEstructura({ [index]: nuevoArray });
  };

  const eliminarElemento = (idAEliminar) => {
    const nuevoArray = especiesEstructura[index].filter((elemento) => elemento.id !== idAEliminar);

    updateEspeciesEstructura({ [index]: nuevoArray });
  };

  const columnas = [
    { field: 'id', headerName: 'ID', flex: 1, ...headerAlignProps },
    { field: 'nombre', headerName: 'Nombre', flex: 1, ...headerAlignProps },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      editable: true,
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
      renderCell: (params) => (
        <IconButton color="secondary" onClick={() => eliminarElemento(params.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 300, width: '100%' }}>
      {especiesEstructura.length === 0 || especiesEstructura[index]?.length === 0 ? (
        <Typography>AAAA</Typography>
      ) : (
        <>
          <DataGrid
            rows={especiesEstructura[index] || []}
            columns={columnas}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
          />
          <Button variant='outlined' onClick={() => handleCantidadChange(1, 5232136)}>AAA</Button>
        </>
      )}
    </div>
  );
};

export default EspeciesCantidad2;