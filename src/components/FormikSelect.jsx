import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FormikSelect({ label, value, onChange, onBlur, error, options }) {
  return (
    <Box sx={{ width: "100%" }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id={`demo-simple-select-label-${label}`}>{label}</InputLabel>
        <Select
          labelId={`demo-simple-select-label-${label}`}
          id={`demo-simple-select-${label}`}
          value={value}
          label={label}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}