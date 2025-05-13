import React, { useEffect, useState } from 'react';
import {
  Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Pagination, TextField
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import CaseFormDialog from '../components/CaseFormDialog';

const ITEMS_PER_PAGE = 5;

const CasesPage = () => {
  const [cases, setCases] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const fetchAll = async () => {
    const [casesRes, devsRes, catsRes] = await Promise.all([
      fetch('https://backend.alazarstudio.ru/api/cases'),
      fetch('https://backend.alazarstudio.ru/api/developers'),
      fetch('https://backend.alazarstudio.ru/api/categories'),
    ]);

    const [caseData, devs, cats] = await Promise.all([
      casesRes.json(),
      devsRes.json(),
      catsRes.json(),
    ]);

    setCases(caseData);
    setDevelopers(devs);
    setCategories(cats);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filtered = cases.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = async (id) => {
    await fetch(`https://backend.alazarstudio.ru/api/cases/${id}`, { method: 'DELETE' });
    fetchAll();
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setDialogOpen(true);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField label="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button variant="contained" startIcon={<Add />} onClick={() => { setEditItem(null); setDialogOpen(true); }}>
          Добавить кейс
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Категории</TableCell>
              <TableCell>Разработчики</TableCell>
              <TableCell></TableCell>
              <TableCell>Изображения</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.title}</TableCell>
                <TableCell>{c.price} ₽</TableCell>
                <TableCell>{c.date}</TableCell>
                <TableCell>
                  {c.categoryIds.map(id => {
                    const cat = categories.find(c => c.id === id);
                    return cat ? cat.name : id;
                  }).join(', ')}
                </TableCell>
                <TableCell>
                  {c.developerIds.map(id => {
                    const dev = developers.find(d => d.id === id);
                    return dev ? dev.name : id;
                  }).join(', ')}
                </TableCell>
                <TableCell>
                  {c.images?.map((img, i) => (
                    <img key={i} src={`https://backend.alazarstudio.ru/uploads/${img}`} alt="" style={{ width: 50, height: 50, marginRight: 4, objectFit: 'cover' }} />
                  ))}
                </TableCell>
                <TableCell sx={{width: '120px'}}>
                  <IconButton onClick={() => handleEdit(c)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(c.id)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(filtered.length / ITEMS_PER_PAGE)}
        page={page}
        onChange={(e, value) => setPage(value)}
        sx={{ mt: 2 }}
      />

      <CaseFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={() => {
          setDialogOpen(false);
          fetchAll();
        }}
        item={editItem}
        allCategories={categories}
        allDevelopers={developers}
      />
    </Box>
  );
};

export default CasesPage;
