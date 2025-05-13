import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './CaseCard.module.css';

const CaseCard = ({ caseItem, allCategories }) => {
  const bg = caseItem.images?.[0]
    ? `url(https://backend.alazarstudio.ru/uploads/${caseItem.preview})`
    : undefined;

  const matchedCategories = allCategories.filter((cat) =>
    caseItem.categoryIds?.includes(cat.id)
  );

  return (
    <Box className={styles.card} style={{ backgroundImage: bg }}>
      {/* Затемняющий слой */}
      <Box className={styles.overlay} />

      {/* Категории */}
      <Box className={styles.categories}>
        {matchedCategories.map((cat) => (
          <Typography key={cat.id} className={styles.categoryText}>
            {cat.name}
          </Typography>
        ))}
      </Box>

      {/* Название */}
      <Box
        className={`${styles.casesWrapper} ${
          finalCases.length < 4 ? styles.alignLeft : ''
        }`}
      >
        <Typography className={styles.title}>{caseItem.title}</Typography>
      </Box>
    </Box>
  );
};

export default CaseCard;
