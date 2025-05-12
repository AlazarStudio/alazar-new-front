import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../auth';
import { Box, Button, TextField, Typography } from '@mui/material';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Неверные данные');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
      <Typography variant="h5">Вход в админ-панель</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, width: 300 }}>
        <TextField
          label="Логин"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Войти
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
