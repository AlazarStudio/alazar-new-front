import React, { useEffect, useState } from 'react';
import {
  Box, Button, TextField, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TableSortLabel, Pagination, IconButton
} from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import DeveloperFormDialog from './DeveloperFormDialog';

const ITEMS_PER_PAGE = 5;

const DeveloperTable = () => {
  const [developers, setDevelopers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const fetchData = async () => {
    const res = await fetch('https://backend.alazarstudio.ru/api/developers');
    const data = await res.json();
    setDevelopers(data);
  };

  useEffect(() => { fetchData(); }, []);
  useEffect(() => {
    const filteredData = developers.filter(dev =>
      Object.values(dev).some(val =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
    setFiltered(filteredData);
  }, [search, developers]);

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
    await fetch(`https://backend.alazarstudio.ru/api/developers/${id}`, { method: 'DELETE' });
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
          Добавить разработчика
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Фото</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={order}
                  onClick={() => handleSort('name')}
                >
                  Имя
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'position'}
                  direction={order}
                  onClick={() => handleSort('position')}
                >
                  Должность
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={order}
                  onClick={() => handleSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pagedData.map((dev) => (
              <TableRow key={dev.id}>
                <TableCell>
                  {dev.avatar && (
                    <img
                      src={`https://backend.alazarstudio.ru/uploads/${dev.avatar}`}
                      alt="avatar"
                      style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                    />
                  )}
                </TableCell>
                <TableCell>{dev.name}</TableCell>
                <TableCell>{dev.position}</TableCell>
                <TableCell>{dev.email}</TableCell>
                <TableCell sx={{width: '120px'}}>
                  <IconButton onClick={() => handleEdit(dev)}><Edit /></IconButton>
                  <IconButton onClick={() => handleDelete(dev.id)}><Delete /></IconButton>
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

      <DeveloperFormDialog
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

export default DeveloperTable;
