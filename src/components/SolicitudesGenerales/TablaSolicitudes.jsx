


import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react'; // Import useState
import axiosInstance from '../../../axiosInstance';
import SearchIcon from '@mui/icons-material/Search';
import { Chip, IconButton } from '@mui/material';
import { amber, blue, green, grey, indigo, orange, pink, red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { getColorForEstado } from '../../utils/formUtils';

const handleUpdateForm = (formId, estado) => {
    console.log(formId)
    // Check if the estado is equal to 2 before making the update
    if (estado === "Sin Empezar") {
        axiosInstance.put(`/forms/updateStateOfForm`, { formId: formId, estado: 3 })
            .then((response) => {
                const data = response.data;
                console.log(data);
                // You can add additional logic here if needed
            })
            .catch((error) => {
                console.error(error);
                // Handle error if necessary
            });
    }
};

const headerAlignProps = {
    headerAlign: 'center',
    align: 'center',
};

const columns = [
    { field: 'id', headerName: 'ID', width: 90, ...headerAlignProps },
    {
        field: 'creadoEl',
        headerName: 'Fecha de emision',
        width: 150,
        ...headerAlignProps
    },
    {
        field: 'rut',
        headerName: 'Rut',
        width: 150,
        ...headerAlignProps
    },
    {
        field: 'razonSocial',
        headerName: 'Razon Social',
        width: 150,
        ...headerAlignProps
    },
    {
        field: 'comuna',
        headerName: 'Comuna',
        width: 110,
        ...headerAlignProps
    },
    {
        field: 'cupo',
        headerName: 'Cupo',
        width: 160,
        ...headerAlignProps
    },
    {
        field: 'estado',
        headerName: 'Estado',
        width: 160,
        renderCell: (params) => {
            return (
                <Chip
                    label={params.row.estado}
                    sx={{
                        backgroundColor: getColorForEstado(params.row.estadoId) || '', // Puedes establecer un color predeterminado aquí
                        color: 'white',
                        width: '100px',
                    }}
                />
            );
        },
        ...headerAlignProps
    },
    {
        field: 'action',
        headerName: 'Acción',
        width: 150,
        renderCell: (params) => (
            <Link to={`/detalle/${params.row.id}`} underline="none">
                <IconButton
                    sx={{
                        backgroundColor: orange[600],
                        '&:hover': {
                            backgroundColor: orange[700], // Cambia el color al hacer hover
                        },
                    }}
                    onClick={() => handleUpdateForm(params.row.id, params.row.estado)}
                >
                    <SearchIcon fontSize="medium" sx={{ color: grey[900] }} />
                </IconButton>
            </Link>
        ),
        ...headerAlignProps
    },
];

function formatDate(date) {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };

    return new Date(date).toLocaleDateString('es-ES', options);
}

const initialSortModel = [
    { field: 'creadoEl', sort: 'desc' }, // 'desc' para orden descendente
];

export default function TablaSolicitudes() {
    const [rows, setRows] = useState([]); // Use state to manage rows


    useEffect(() => {
        axiosInstance.get("/forms/all")
            .then((response) => {
                const forms = response.data;
                console.log(forms)
                const fillRows = forms.map((form) => ({
                    ...form,
                    creadoEl: formatDate(form.creadoEl),
                    estado: form.estado.nombre
                }))
                setRows(fillRows);
            })
    }, []);

    return (
        <Box sx={{ height: 800, width: '100%' }}>
            <DataGrid
                rows={rows} // Use the updated rows state
                columns={columns}
                rowSelection={false}
                sortModel={initialSortModel}
            />
        </Box>
    );
}