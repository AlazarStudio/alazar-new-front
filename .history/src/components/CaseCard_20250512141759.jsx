import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const CaseCard = ({ caseItem, allCategories }) => {
    const bg = caseItem.images?.[0]
        ? `url(https://backend.alazarstudio.ru/uploads/${caseItem.preview})`
        : undefined;

    const matchedCategories = allCategories.filter(cat =>
        caseItem.categoryIds?.includes(cat.id)
    );

    return (
        <Box
        sx={{
          width: '20%',
          aspectRatio: '1 / 1',
          borderRadius: '10px',
          overflow: 'hidden',
          backgroundImage: bg,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          boxShadow: 5,
          outline: '1px solid red',
        }}
      >
        {/* Затемнение фоном */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            zIndex: 1,
          }}
        />
      
        {/* Контент внутри — не влияет на размер */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', // равномерно между категориями и заголовком
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Категории */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
            }}
          >
            {matchedCategories.map((cat) => (
              <Typography
                key={cat.id}
                sx={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: '#FFFFFFB2',
                }}
              >
                {cat.name}
              </Typography>
            ))}
          </Box>
      
          {/* Заголовок */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '22px',
              color: '#fff',
            }}
          >
            {caseItem.title}
          </Typography>
        </Box>
      </Box>
      
    );
};

export default CaseCard;
