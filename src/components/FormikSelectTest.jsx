import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useField } from 'formik';

export default function FormikSelectTest({ label, options, ...props }) {
  const [field, meta] = useField(props.name);

  return (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth variant="standard">
        <InputLabel id={`demo-simple-select-label-${label}`}>{label}</InputLabel>
        <Select
          labelId={`demo-simple-select-label-${label}`}
          id={`demo-simple-select-${label}`}
          {...field}
          {...props}
          error={meta.touched && Boolean(meta.error)}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {meta.touched && meta.error && <div style={{ color: 'red' }}>{meta.error}</div>}
      </FormControl>
    </Box>
  );
}