import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormContext } from '../../context/FormContext';
import { Button, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { red } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';

const headerAlignProps = {
  headerAlign: 'center',
  align: 'center',
};

const EspeciesCantidad = ({ index, returnEspecies }) => {
  const { especiesEstructura, updateEspeciesEstructura, formApplication } = useFormContext();
  const [especiesData, setEspeciesData] = useState({ columns: [], rows: [] });

  const removeId = (idToRemove) => {
    setEspeciesData((prevData) => {
      // console.log("prevData: ", prevData)
      const updatedRows = prevData.rows.filter((row) => row.id !== idToRemove);
      const newData = { ...prevData, rows: updatedRows };

      updateEspeciesEstructura({ [index]: updatedRows });
      // console.log("ESPECIE ESTRUCTURA: ", especiesEstructura)

      returnEspecies(updatedRows);
      return newData;
    });
  };

  const handleCantidadChange = (id, newValue) => {
    // Validar que newValue sea un número antes de actualizar
    if (!isNaN(newValue)) {
      setEspeciesData((prevData) => {
        const updatedRows = prevData.rows.map((row) =>
          row.id === id ? { ...row, cantidad: newValue } : row
        );
        const newData = { ...prevData, rows: updatedRows };
  
        
        // Agregar un retraso de 300 milisegundos (ajusta según sea necesario)
        setTimeout(() => {
          updateEspeciesEstructura({ [index]: updatedRows });
          returnEspecies(updatedRows);
        }, 5);
  
        return newData;
      });
    }
  };

  useEffect(() => {
    const especies = especiesEstructura[index] || [];
    console.log("especies temporales: ", especies);
    
    const aa = formApplication.estructuras[index]?.especies;
    console.log("form app especies: ", aa);



    const rows = especies.map((especie) => {
      console.log(especie)
      const cantidad = aa ? aa.find((item) => item.id === especie.id)?.cantidad || "" : "";

      return {
        id: especie.id,
        especieId: especie.id,
        nombre: especie.nombre,
        cantidad: especie.cantidad,
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
      };
    });


    const columns = [
      { field: 'especieId', headerName: 'ID', flex: 1, ...headerAlignProps },
      { field: 'nombre', headerName: 'Especie', flex: 2, ...headerAlignProps },
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

    returnEspecies(rows);
  }, [especiesEstructura[index]]);

  return (
    <div style={{ height: 300, width: '100%' }}>
      {especiesEstructura.length === 0 || especiesEstructura[index]?.length === 0 ? (
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
        <>
          <DataGrid
            {...especiesData}
            pageSize={5}
          />

        </>
      )}
    </div>
  );
};

export default EspeciesCantidad;