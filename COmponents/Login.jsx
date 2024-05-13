// Login.jsx
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import './index.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (event) => {
        event.preventDefault();

        console.log('Email:', email);
        console.log('Password:', password);
        if (email.trim() === 'gullmeena.syed31@gmail.com' && password.trim() === '12345') {
           
            localStorage.setItem('isLoggedIn', true);
            navigate('/home');
        } else {
            alert('Invalid email or password');
        }
    };
    const handleHome = () => {
        navigate('/home');
    };
    return (
        <div>
            <div className="header">
                <div className="left-side">
                    <IconButton color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    Jazaa Book Search
                </div>
                <div className="right-side">
                    <Button variant="contained" style={{ marginRight: '8px' }} onClick={handleHome}>Home</Button>
                    <Button variant="contained">Login</Button>
                </div>
            </div>
            <div className="loginform">
                <form onSubmit={handleSignIn}>
                    <Avatar
                        sx={{
                            bgcolor: '#E70F45',
                            margin: 'auto',
                            marginTop: 2
                        }}
                    >
                        <LockOutlinedIcon />
                    </Avatar>
                    <p><strong>Log In </strong></p>
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    /><br/>
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br/>
                    <FormControlLabel
                        control={<Checkbox  className="custom-checkbox" color="primary"/>}
                        label="Remember me"  sx={{ marginRight: 28}}
                    /><br/>
                    <Button
                        type="submit"
                        variant="contained" size="small"
                        sx={{ paddingLeft:'151px',paddingRight:'151px'}}
                    >
                        Sign In
                    </Button>
                    <div className='Link'>
                        <Link style={{ marginRight: 66, fontSize: 15, color:'#323dcf'}} href="#">
                            Forgot password?
                        </Link>
                        <Link style={{ fontSize: 15, color:"blue" }} href="#">
                            Don't have an account? Sign Up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
