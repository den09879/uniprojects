import ViewHeader from '../components/ViewHeader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ReactComponent as CurveArrowDown } from '../images/CurveArrowDown.svg';
import { ReactComponent as InvoiceUpload } from '../images/uploadFile.svg';
import { ReactComponent as UploadButton } from '../images/upload.svg';
import { useNavigate } from "react-router-dom";

import './Upload.css';

const Upload = () => {

    let navigate = useNavigate(); 
    const routeChange = (ref) =>{ 
      let path = ref; 
      navigate(path);
    }
    
    return (
    <>
        <ViewHeader /> 
        <h1> Upload Invoice </h1>		
        <div className="upload">
            <InvoiceUpload class='upload'/>
    
        </div>
        <div className="arrowDown">
            <CurveArrowDown class='arrowDown'/>
    
        </div>
        <div className="uploadBar">
            <Box sx={{ width: 850, height: 50, background:'#B2C3FF'}}>
                <UploadButton class='uploadButton'/>

                <Typography class='barText' variant="h4" >
                    UPLOAD YOUR XML FILE HERE
                </Typography>
    
            </Box>        
        </div>

        <Button variant='contained' size='large' sx={{ color: '#ffffff', background: '#4760ff', marginLeft: 150, marginTop: -9.75 }} onClick={() => routeChange('../uploaderror')} >
            <Typography variant="h4" component="div" sx={{color: "white", fontSize: "1.25rem"}}>
                Choose File
            </Typography>
        </Button>

        <Button variant='contained' size='large' sx={{ width:180, color: '#ffffff', background: '#4760ff', marginLeft:150, marginTop: -1.5}} onClick={() => routeChange('../Dashboardb')} >
            <Typography variant="h4" component="div" sx={{color: "white", fontSize: "1.25rem"}}>
                Render
            </Typography>
        </Button>
    </>
    )
}

export default Upload