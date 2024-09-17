import { useState } from 'react';
import Typography from '@mui/material/Typography';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Background } from '../components/Background';
import './Login.css';
import './Home.css';


const Login = () => {
    // States for registration
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    let navigate = useNavigate(); 
    const routeChange = (ref) =>{ 
      let path = ref; 
      navigate(path);
    }



    // Showing error message if error is true
    const errorMessage = () => {
        return (
        <div
            className="error"
            style={{
            display: error ? '' : 'none',
            }}>
            <Typography className='centerise'variant="subtitle2" style={{color: '#f00'}}>
                *Please enter all fields
            </Typography>
        </div>
        );
    };

    // Showing success message
    const successMessage = () => {
        return (
        <div
            className="success"
            style={{
            display: submitted ? '' : 'none',
            }}>
            <h1>Successfully signed in</h1>
        </div>
        );
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = new FormData(event.currentTarget);
        if (data.get('email') === '' || data.get('password') === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
    };
    return (
    <>
        
        <Container component="main" maxWidth="md">
        <CssBaseline/>
        <Background/>
        
        <h1>DashTracker</h1>
        <div className="centerise">
            <Grid size="Large">
            <div className="centerise">
                <AutoGraphIcon className="mainLogo" fontSize="large" sx={{color: '#4760ff'}}/>
            </div>
            </Grid>
        </div>


        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}    
        >
            <Typography component="h1" variant="h3">
                Sign In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />
                    </Grid>
                </Grid>
                
                <Link href="#" variant="body2" onClick={() => routeChange('/DashboardC')}>
                    <Button type="submit" fullWidth variant="contained"sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                </Link>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <div className="messages">
                            {errorMessage()}
                            {successMessage()}
                        </div>
                        <Link href="#" variant="body2" onClick={() => routeChange('/Register')}>
                            Don't have an account? Sign up here
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
      </Container>
    </>
    )
}

export default Login