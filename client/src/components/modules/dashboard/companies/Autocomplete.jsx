import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import data from '../../../../assets/data.json';

export default function MyAutocomplete({handler, type}) {
  const [value, setValue] = React.useState('');
  const JSONtype = type === 'Format'? "formats": 'themes'
  const option = data[JSONtype]
  function useHandler(newValue) {
    console.log(handler(newValue, type));
    handler(newValue, type)
  }
  return (
    <Autocomplete
      limitTags={4}
      value={value}
      onChange={(event, newValue) => {
        useHandler(newValue)
      }}
      inputValue={value}
      onInputChange={(event, newInputValue) => {
        setValue(newInputValue);
      }}
      options={option}
      renderInput={(params) => <TextField {...params} className={'auto-'+type} label={type} variant="outlined" sx={{ width: "auto", minWidth: "250px", maxWidth: "300px" }} />}
      renderOption={(props, option) => {
        const matches = option.match(new RegExp(`(${value})`, 'i'));
        const parts = option.split(new RegExp(`(${value})`, 'i'));

        return (
          <li {...props}>
            {parts.map((part, index) => (
              <span key={index} style={{ fontWeight: matches && matches[0] === part ? 700 : 400 }}>
                {part}
              </span>
            ))}
          </li>
        );
      }}
    />
  )
}