import { Link, Typography } from "@mui/material";

export default function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center" sx={{mt:4}}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Onboarding
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }