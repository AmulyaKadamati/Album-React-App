import { React, useState } from 'react';
import { TextField, Container, Button } from '../../../../node_modules/@mui/material/index';
import { fetchPostData } from 'client/Client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// ==============================|| AUTHENTICATION - LOGIN ||============================== //
const AuthLogin = () => {
  

  const [email, setEmail] = useState('');       
  const [password, setPassword] = useState(''); 
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();              


  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn) {
      navigate('/');
      window.location.reload();
    }
  }, []); 

  const validEmail = () => {
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); 
  };

  const validPassword = () => {
  
    return password.length >= 6 && password.length <= 15;
  };

  const handleLogin = async () => {
 
    setErrors({ email: '', password: '' });


    if (!validEmail()) {
    
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
      return;
    }

    if (!validPassword()) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be atleast 6 characters' }));
      return;
    }

    
    fetchPostData('/auth/token', { email, password }) 
      .then((response) => {
        const { token } = response.data; 
        setLoginError('');
        localStorage.setItem('token', token); 
        navigate('/'); 
        window.location.reload();
      })
      .catch((error) => {
        console.error('Login error: ', error);

        setLoginError('An error occured during login');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        error={!!errors.password}
        helperText={errors.password}
      />

      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
        Login
      </Button>

      {loginError && <p style={{ color: 'red' }}> {loginError}</p>}
    </Container>
  );
};

export default AuthLogin;
