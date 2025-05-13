import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText
} from '@mui/material';

const CaseFormDialog = ({ open, onClose, onSave, item, allCategories, allDevelopers }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [link, setLink] = useState('');
  const [date, setDate] = useState('');
  const [categoryIds, setCategoryIds] = useState([]);
  const [developerIds, setDeveloperIds] = useState([]);
  const [preview, setPreview] = useState(null); // новый файл preview
  const [previewName, setPreviewName] = useState(''); // существующее имя preview
  const [files, setFiles] = useState([]); // изображения

  useEffect(() => {
    if (item) {
      setTitle(item.title || '');
      setPrice(item.price || '');
      setLink(item.link || '');
      setDate(item.date || '');
      setDate(item.positionTop || '');
      setCategoryIds(item.categoryIds || []);
      setDeveloperIds(item.developerIds || []);
      setPreview(null);
      setPreviewName(item.preview || '');
      setFiles([]);
    } else {
      setTitle('');
      setPrice('');
      setLink('');
      setDate('');
      setCategoryIds([]);
      setDeveloperIds([]);
      setPreview(null);
      setPreviewName('');
      setFiles([]);
    }
  }, [item]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('link', link);
    formData.append('date', date);
    formData.append('positionTop', positionTop);
    formData.append('categoryIds', JSON.stringify(categoryIds));
    formData.append('developerIds', JSON.stringify(developerIds));

    if (preview) {
      formData.append('preview', preview);
    }
    for (let f of files) {
      formData.append('images', f);
    }

    const url = item
      ? `https://backend.alazarstudio.ru/api/cases/${item.id}`
      : `https://backend.alazarstudio.ru/api/cases`;

    const method = item ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        body: formData
      });

      if (!res.ok) throw new Error('Ошибка при сохранении кейса');

      onSave();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{item ? 'Редактировать кейс' : 'Добавить кейс'}</DialogTitle>
      <DialogContent>
        <TextField fullWidth label="Название" value={title} onChange={e => setTitle(e.target.value)} margin="normal" />
        <TextField fullWidth label="Цена" type="number" value={price} onChange={e => setPrice(e.target.value)} margin="normal" />
        <TextField fullWidth label="Ссылка на сайт" value={link} onChange={e => setLink(e.target.value)} margin="normal" />
        <TextField fullWidth label="Дата" type="date" value={date} onChange={e => setDate(e.target.value)} margin="normal" InputLabelProps={{ shrink: true }} />

        <InputLabel sx={{ mt: 2 }}>Категории</InputLabel>
        <Select
          multiple
          fullWidth
          value={categoryIds}
          onChange={(e) => setCategoryIds(e.target.value)}
          input={<OutlinedInput />}
          renderValue={(selected) =>
            selected.map(id => {
              const cat = allCategories.find(c => c.id === id);
              return cat ? cat.name : id;
            }).join(', ')
          }
        >
          {allCategories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              <Checkbox checked={categoryIds.includes(cat.id)} />
              <ListItemText primary={cat.name} />
            </MenuItem>
          ))}
        </Select>

        <InputLabel sx={{ mt: 2 }}>Разработчики</InputLabel>
        <Select
          multiple
          fullWidth
          value={developerIds}
          onChange={(e) => setDeveloperIds(e.target.value)}
          input={<OutlinedInput />}
          renderValue={(selected) =>
            selected.map(id => {
              const dev = allDevelopers.find(d => d.id === id);
              return dev ? dev.name : id;
            }).join(', ')
          }
        >
          {allDevelopers.map((dev) => (
            <MenuItem key={dev.id} value={dev.id}>
              <Checkbox checked={developerIds.includes(dev.id)} />
              <ListItemText primary={dev.name} />
            </MenuItem>
          ))}
        </Select>

        {/* Превью изображение */}
        <InputLabel sx={{ mt: 3 }}>Обложка (preview)</InputLabel>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPreview(e.target.files[0])}
        />
        {previewName && !preview && (
          <img
            src={`https://backend.alazarstudio.ru/uploads/${previewName}`}
            alt="preview"
            style={{ marginTop: 10, maxWidth: 150, borderRadius: 8 }}
          />
        )}

        {/* Изображения */}
        <InputLabel sx={{ mt: 3 }}>Галерея</InputLabel>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setFiles([...e.target.files])}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained">Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CaseFormDialog;
