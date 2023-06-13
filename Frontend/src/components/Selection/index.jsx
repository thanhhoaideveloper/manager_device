import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import _ from 'lodash';

const Selection = (props) => {
    const {name,values,data = {}, handleChange, error, label, required = false, helperText} = props;
    const [age, setAge] = React.useState('');
    console.log('props',props)
    console.log('_.size(data)',_.size(data))
    // handleChange = (event) => {
    //     setAge(event.target.value);
    // };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth error = {error}>
                <InputLabel id="demo-simple-select-label">{label}{required ? '*' : ''}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values}
                    label={label}
                    onChange={handleChange}
                >
                    {
                        _.size(data) > 0 ?
                            data.map((value) => ( <MenuItem value={value.key}>{value.name}</MenuItem>)) : null
                    }
                </Select>
                <FormHelperText>{helperText}</FormHelperText>
            </FormControl>
        </Box>
    );
}
export default Selection;