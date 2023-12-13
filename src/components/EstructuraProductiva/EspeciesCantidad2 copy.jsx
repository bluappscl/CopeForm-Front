import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormContext } from '../../context/FormContext';
import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { red } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';

const headerAlignProps = {
  headerAlign: 'center',
  align: 'center',
};

const EspeciesCantidad2copy = ({ index, returnEspecies }) => {
  const { especiesEstructura, updateEspeciesEstructura, formEstructuraProductiva } = useFormContext();
  const [especiesData, setEspeciesData] = useState({ columns: [], rows: [] });
  const [noEspeciesSelected, setNoEspeciesSelected] = useState(false);

  console.log(formEstructuraProductiva)

  const printEspecies = () => {
    const especies = formEstructuraProductiva
    console.log("LENGTH ", especies.length)
  };

  const removeId = (idToRemove) => {
    setEspeciesData((prevData) => {
      console.log("prevData: ", prevData)
      const updatedRows = prevData.rows.filter((row) => row.id !== idToRemove);
      const newData = { ...prevData, rows: updatedRows };
      console.log("updatedRows: ", updatedRows)
      updateEspeciesEstructura({ [index]: updatedRows });
      returnEspecies(updatedRows);
      setNoEspeciesSelected(updatedRows.length === 0); // Update noEspeciesSelected state
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
        returnEspecies(updatedRows);
        return newData;
      });
    }
  };

  useEffect(() => {
    const especies = especiesEstructura[index] || [];
    console.log("especies temporales: ", especies);

    const aa = formEstructuraProductiva.estructuras[index]?.especies;
    console.log("DSIHFISD: ,", aa);

    const rows = especies.map((especie) => {
      const cantidad = aa ? aa.find((item) => item.id === especie.id)?.cantidad || " " : " ";

      return {
        id: especie.id,
        nombre: especie.nombre,
        cantidad: cantidad,
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

    console.log("ROWS ", rows);

    const columns = [
      { field: 'id', headerName: 'ID', flex: 1, ...headerAlignProps },
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
  }, [especiesEstructura]);

  return (
    <div style={{ height: 300, width: '100%' }}>
      {especiesEstructura.length === 0 || especiesEstructura[index]?.length === 0 ? (
        <Typography>AAAA</Typography>
      ) : (
        <>
          <DataGrid
            {...especiesData}
            pageSize={5}
          />
          {/* <Button variant='outlined' onClick={() => printEspecies()}>PRINT ESPECIES</Button> */}
        </>
      )}
    </div>
  );
};

export default EspeciesCantidad2copy;