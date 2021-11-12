import React, { VFC } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

interface Props {
  onSubmitChannelCreate: any;
  onChangeVisibility: any;
  onChangeName: any;
  name: string;
  visibility: string;
  value: string;
}

const ChannelForm: VFC<Props> = ({
  onSubmitChannelCreate,
  onChangeVisibility,
  onChangeName,
  name,
  visibility,
  value,
}) => {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1 },
        width: 'calc(100% - 15px)',
        padding: '5px 10px',
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl
        variant="standard"
        sx={{ color: 'white !importance' }}
        style={{ color: 'white', width: '100%' }}
      >
        <InputLabel htmlFor="component-simple" style={{ color: 'white' }}>
          Name
        </InputLabel>
        <Input
          id="component-simple"
          value={name}
          onChange={onChangeName}
          style={{ color: 'white', borderColor: 'red  !importance' }}
        />
      </FormControl>
      <FormControl variant="standard" sx={{ width: '100%', color: 'white' }}>
        <InputLabel id="demo-simple-select-standard-label" style={{ color: 'white' }}>
          Visibility
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={visibility}
          onChange={onChangeVisibility}
          label="Visibility"
          style={{ color: 'white' }}
        >
          <MenuItem value={0}>Public</MenuItem>
          <MenuItem value={1}>Protected</MenuItem>
          <MenuItem value={2}>Private</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        style={{ width: '91px', height: '36px', margin: '5px 0 12px 8px', fontWeight: 600 }}
        onClick={onSubmitChannelCreate}
      >
        {value}
      </Button>
    </Box>
  );
};

export default ChannelForm;
