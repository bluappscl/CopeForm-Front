import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, IconButton, Modal, Paper } from '@mui/material';
import { orange } from '@mui/material/colors';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axiosInstance from '../../../axiosInstance';
import { useEffect, useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import CloseIcon from '@mui/icons-material/Close';

function EspeciesExistentes({ arrayIds, index }) {
  const [especiesData, setEspeciesData] = useState({ columns: [], rows: [] });
  const [idList, setIdList] = useState([]);
  const { especiesEstructura, updateEspeciesEstructura } = useFormContext();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setIdList(especiesEstructura[index] || []);
  }, [especiesEstructura]);

  const addId = (id, nombre) => {
    setIdList((prevIdList) => {
      if (prevIdList.some((item) => item.id === id) || idList.some((item) => item.id === id)) {
        return prevIdList;
      } else {
        const updatedIdList = [...prevIdList, { id, nombre: nombre, cantidad: '' }];
        console.log("updatedIdList ", updatedIdList)
        updateEspeciesEstructura({ [index]: updatedIdList });
        return updatedIdList;
      }
    });
  };

  useEffect(() => {
    axiosInstance.get("/especies/all")
      .then((response) => {
        const especies = response.data;
        const rows = especies.map((especie, index) => ({
          id: especie.id,
          especie: especie.nombre,
          accion: (
            <IconButton variant="contained" sx={{
              backgroundColor: orange[600],
              '&:hover': { backgroundColor: orange[700] },
            }}
              onClick={() => addId(especie.id, especie.nombre)}
            >
              <FileDownloadIcon />
            </IconButton>
          ),
        }));

        const columns = [
          { field: 'especie', headerName: 'Especie', flex: 2, headerAlign: 'center', align: 'center' },
          {
            field: 'accion',
            headerName: 'Acción',
            flex: 2,
            headerAlign: 'center',
            align: 'center',
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

  const textosLocalizados = {
    columnMenuUnsort: "Quitar Orden",
    columnMenuSortAsc: "Ordenar de forma ascendente",
    columnMenuSortDesc: "Ordenar de forma descendente",
    columnMenuFilter: "Filtrar",
    columnMenuHideColumn: "Ocultar columna",
    columnMenuShowColumns: "Mostrar columnas"
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Button variant='contained' size='small' style={{ marginRight: 'auto' }} onClick={handleOpenModal}>
        Expandir Especies
      </Button>
      <Box>
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <>
            <Paper style={{ height: '90%', width: '90%', overflow: 'hidden', margin: 'auto' }}>
              <DataGrid
                {...especiesData}
                localeText={textosLocalizados}
              />
            </Paper>
            <Button
              variant='contained'
              sx={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                backgroundColor: orange[600],
                '&:hover': { backgroundColor: orange[700] },
              }}
              onClick={handleCloseModal}
            >
              Cerrar
            </Button>
          </>
        </Modal>
      </Box>
      <Box style={{ height: 400, width: '100%' }}>
        <DataGrid {...especiesData} localeText={textosLocalizados} />
      </Box>
    </>
  );
}

export default EspeciesExistentes;