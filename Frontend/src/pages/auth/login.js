import { Alert, Avatar, Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login } from "../../store/reducer/auth";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
    const message = useSelector(state => state.authReducer.message);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = async () => {
        if(!email || !password) return;
        await dispatch(login({email, password}));
    }

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/');
        }
    }, [isAuthenticated, navigate])
    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box sx={{ mt: 1 , width: '300px'}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    color="secondary"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    color="secondary"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                {message && (<Alert severity="error">{message}</Alert>)}
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Login;