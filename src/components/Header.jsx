import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button
} from '@mui/material';

const Header = ({ activeCategoryId, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://backend.alazarstudio.ru/api/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'transparent',
        boxShadow: 'none',
        px: 4,
        py: 2,
      }}
    >
      <Toolbar disableGutters sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Логотип */}
        <Typography variant="h5" sx={{ fontWeight: 900, color: '#fff' }}>
          <img src="/headerLogo.png" alt="logo" />
        </Typography>

        {/* Категории */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <Button
            onClick={() => onCategorySelect(null)}
            variant={activeCategoryId === null ? 'contained' : 'outlined'}
            sx={{
              fontWeight: 600,
              fontSize: '14px',
              color: '#FFFFFF',
              textTransform: 'uppercase',
              bgcolor: activeCategoryId === null ? '#f40087' : 'transparent',
              border: 'none',
              p: 0
            }}
          >
            Все
          </Button>

          {categories.map(cat => (
            <Button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              variant={activeCategoryId === cat.id ? 'contained' : 'outlined'}
              sx={{
                fontWeight: 600,
                fontSize: '14px',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                bgcolor: activeCategoryId === cat.id ? '#f40087' : 'transparent',
                border: 'none',
                p: '7px 10px'
              }}
            >
              {cat.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};


export default Header;
