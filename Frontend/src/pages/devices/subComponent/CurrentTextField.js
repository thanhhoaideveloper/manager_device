import { InputAdornment, TextField } from "@mui/material";

function CurrencyTextField(props) {
    const { inputRef, ...other } = props;
  
    return (
      <TextField
        InputProps={{
          inputComponent: CurrencyFormat,
          startAdornment: <InputAdornment position="start">VND</InputAdornment>,
          inputProps: {
            inputRef: inputRef,
            style: { textAlign: 'right' }
          }
        }}
        {...other}
      />
    );
  }
  
  function CurrencyFormat(props) {
    const { inputRef, onChange, ...other } = props;
  
    const handleChange = (event) => {
      const value = event.target.value;
      onChange(value === '' ? '' : Number(value).toLocaleString('vi', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    };
  
    return (
      <input
        ref={inputRef}
        type="number"
        {...other}
      />
    );
  }

  export default CurrencyTextField;