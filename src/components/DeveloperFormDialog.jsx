import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box
} from '@mui/material';

const DeveloperFormDialog = ({ open, onClose, onSave, item }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setPosition(item.position || '');
      setEmail(item.email || '');
      setAvatar(item.avatar || '');
    } else {
      setName('');
      setPosition('');
      setEmail('');
      setAvatar('');
    }
    setFile(null);
  }, [item]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('email', email);
    if (file) {
      formData.append('image', file);
    }

    const url = item
      ? `https://backend.alazarstudio.ru/api/developers/${item.id}`
      : 'https://backend.alazarstudio.ru/api/developers';

    const method = item ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (!res.ok) throw new Error('Ошибка при сохранении');

      onSave();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{item ? 'Редактировать' : 'Добавить'} разработчика</DialogTitle>
      <DialogContent>
        <TextField
          label="Имя"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Должность"
          fullWidth
          margin="normal"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Box mt={2}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {avatar && !file && (
            <img
              src={`https://backend.alazarstudio.ru/uploads/${avatar}`}
              alt="avatar"
              style={{ marginTop: 10, maxWidth: 100, borderRadius: '50%' }}
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeveloperFormDialog;
