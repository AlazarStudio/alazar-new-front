import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import styles from './Header.module.css';

const Header = ({ activeCategoryId, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('https://backend.alazarstudio.ru/api/categories')
      .then(res => res.json())
      .then(setCategories);
  }, []);

  return (
    <AppBar position="static" className={styles.appBar} elevation={0}>
      <Toolbar disableGutters className={styles.toolbar}>
        {/* Логотип */}
        <Typography variant="h5" className={styles.logo}>
          <img src="/logo_alazar.svg" alt="logo" />
        </Typography>

        {/* Категории */}
        <Box className={styles.categoryList}>
        

          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.id)}
              className={`${styles.categoryButton} ${activeCategoryId === cat.id ? styles.categoryButtonActive : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
