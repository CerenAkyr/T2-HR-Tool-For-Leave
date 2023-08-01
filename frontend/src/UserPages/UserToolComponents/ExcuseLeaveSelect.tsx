import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "../UserPages.css";

interface SelectExcuseLeaveProps {
  onChange: (selectedExcuseType: string) => void; // Handler to pass selected excuseType to parent component
}

export default function SelectExcuseLeave(props: SelectExcuseLeaveProps) {
    const [excuseLeave, setexcuseLeave] = React.useState('');
  
   const handleChange = (event: SelectChangeEvent) => {
    const selectedExcuseType = event.target.value;
    setexcuseLeave(selectedExcuseType);
    props.onChange(selectedExcuseType); // Pass the selected excuseType to parent component
  };

    return(<div className="select__center" style={{marginTop: "30px"}}>
    <FormControl className='formControl' sx={{ m: 1, minWidth: 150 , maxWidth:200}}>
      <InputLabel
        id="demo-simple-select-autowidth-label"
        className="select__input"
        
      >
        İzin Sebebi
      </InputLabel>
      <Select 

        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={excuseLeave}
        onChange={handleChange}
        autoWidth
        label="Excuse Leave"
        sx={{
         
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b3cae7', // Seçili olmayan öğelerin çerçeve rengi
          },
        }}
      >
      <MenuItem value=""sx={{width:200}}>
        <em>-</em>
      </MenuItem>
      <MenuItem value="yillik" style={{border: "1px solid #b3cae7" }}>Yıllık İzin</MenuItem>
      <MenuItem value="mahsup"style={{border: "1px solid #b3cae7" }}>Mahsup İzin</MenuItem>
      <MenuItem value="mazeret"style={{border: "1px solid #b3cae7" }}>Mazeret İzni</MenuItem>
      <MenuItem value="ucretsiz"style={{border: "1px solid #b3cae7" }}>Ücretsiz İzin</MenuItem>
      <MenuItem value="hastalik" style={{border: "1px solid #b3cae7" }}>Hastalık</MenuItem>
      <MenuItem value="dogum"style={{border: "1px solid #b3cae7" }}>Doğum Sonrası</MenuItem>
      <MenuItem value="olum"style={{border: "1px solid #b3cae7" }}>Ölüm İzni</MenuItem>
      <MenuItem value="diger"style={{border: "1px solid #b3cae7" }}>Diğer</MenuItem>
    </Select>
    </FormControl>
    </div>)

}
