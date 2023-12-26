import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { orange } from '@mui/material/colors';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import axiosInstance from '../../../axiosInstance';
import { useEffect, useState } from 'react';
import { useFormContext } from '../../context/FormContext';

function EspeciesExistentes({ arrayIds, index }) {
    const [especiesData, setEspeciesData] = useState({ columns: [], rows: [] });
    const [idList, setIdList] = useState([]);
    const { especiesEstructura, updateEspeciesEstructura, updateFormEstructuraProductiva, formEstructuraProductiva } = useFormContext();


    // console.log("existentes: ", formEstructuraProductiva)
    useEffect(() => {
        setIdList(arrayIds);
    }, [arrayIds]);

    const addId = (id, nombre) => {
        setIdList((prevIdList) => {
            if (prevIdList.some((item) => item.id === id) || arrayIds.some((item) => item.id === id)) {
                return prevIdList;
            } else {
                const updatedIdList = [...prevIdList, { id, nombre: nombre, cantidad: '' }];
                console.log("updatedIdList ", updatedIdList)
                updateEspeciesEstructura({ [index]: updatedIdList });
                // returnIdList(updatedIdList);
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
                    especie: especie.nombre,  // Ajusta este campo según la estructura de tu objeto especie
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
                    { field: 'id', headerName: 'ID', flex: 1, headerAlign: 'center', align: 'center' },
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
    }, []);  // La dependencia vacía asegura que se ejecute solo una vez al montar el componente


    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid {...especiesData} />
        </div>
    );
}

export default EspeciesExistentes;