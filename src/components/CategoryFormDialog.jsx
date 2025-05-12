import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

const CategoryFormDialog = ({ open, onClose, onSave, item }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (item) {
      setName(item.name || '');
      setDescription(item.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [item]);

  const handleSubmit = async () => {
    const body = JSON.stringify({ name, description });

    const url = item
      ? `https://backend.alazarstudio.ru/api/categories/${item.id}`
      : `https://backend.alazarstudio.ru/api/categories`;

    const method = item ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (!res.ok) throw new Error('Ошибка при сохранении');

      onSave();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{item ? 'Редактировать' : 'Добавить'} категорию</DialogTitle>
      <DialogContent>
        <TextField
          label="Название"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Описание"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryFormDialog;
