// mainLinkItems.js
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Link as RouteLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { grey } from '@mui/material/colors';

const color = `${grey[200]}`

export const mainLinkItems = () => (
  <nav>
    <Link to={`/`} component={RouteLink} underline='none' color={'white'}>
      <ListItemButton>
        <DashboardIcon style={{ color: color }} sx={{ mx: 3, my: 1 }} />
        Solicitudes
      </ListItemButton>
    </Link>
    {/* <Link to={`/form`} component={RouteLink} underline='none' color={'white'}>
      <ListItemButton>
        <DashboardIcon style={{ color: color }} sx={{ mx: 3, my: 1 }} />
        Form
      </ListItemButton>
    </Link> */}
  </nav>
);