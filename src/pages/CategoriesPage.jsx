import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel,
  Pagination, IconButton
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import CategoryFormDialog from '../components/CategoryFormDialog';

const ITEMS_PER_PAGE = 5;

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchData = async () => {
    const res = await fetch('https://backend.alazarstudio.ru/api/categories');
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => { fetchData(); }, []);
  useEffect(() => {
    const filteredData = categories.filter(cat =>
      Object.values(cat).some(val =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
    setFiltered(filteredData);
  }, [search, categories]);

  const handleSort = (field) => {
    const isAsc = orderBy === field && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(field);
  };

  const sortedData = [...filtered].sort((a, b) => {
    const valA = a[orderBy]?.toString().toLowerCase() || '';
    const valB = b[orderBy]?.toString().toLowerCase() || '';
    return order === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
  });

  const pagedData = sortedData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleDelete = async (id) => {
    await fetch(`https://backend.alazarstudio.ru/api/categories/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditItem(null);
    setDialogOpen(true);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Поиск"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" startIcon={<Add />} onClick={handleAdd}>
          Добавить категорию
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={order}
                  onClick={() => handleSort('name')}
                >
                  Название
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'description'}
                  direction={order}
                  onClick={() => handleSort('description')}
                >
                  Описание
                </TableSortLabel>
              </TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pagedData.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell>{cat.description}</TableCell>
                <TableCell sx={{width: '120px'}}>
                  <IconButton onClick={() => handleEdit(cat)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(cat.id)}><Delete /></IconButton>
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

      <CategoryFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={() => {
          setDialogOpen(false);
          fetchData();
        }}
        item={editItem}
      />
    </Box>
  );
};

export default CategoriesPage;
