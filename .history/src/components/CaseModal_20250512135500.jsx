import React from 'react';
import {
  Box, Typography, IconButton, Avatar, Drawer, Button, Popover, List, ListItem, ListItemAvatar, ListItemText
} from '@mui/material';
import { Close } from '@mui/icons-material';

const CaseModal = ({ open, onClose, caseItem, allDevelopers, allCategories }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  if (!caseItem) return null;

  const mainImage = caseItem.images?.[0];
  const caseCategories = allCategories.filter(cat => caseItem.categoryIds.includes(cat.id));
  const caseDevelopers = allDevelopers.filter(dev => caseItem.developerIds.includes(dev.id));

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      ModalProps={{
        BackdropProps: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)', // фон позади модалки
          }
        }
      }}
      PaperProps={{
        sx: {
          background: 'none', // полностью убираем Paper фон
          boxShadow: 'none',  // убираем тень
        },
      }}
    >
      <Box sx={{ height: '100vh', color: '#fff', position: 'relative' }}>
        {/* Кнопка закрытия */}
        <IconButton
          onClick={onClose}
          sx={{ position: 'fixed', top: 16, right: 36, color: '#fff', zIndex: 10, backgroundColor: '#535353' }}
        >
          <Close />
        </IconButton>

        {/* Контент */}
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4, pb: 0 }}>
          {/* Название и категории */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography fontWeight={500} fontSize={'26px'}>
                {caseItem.title}
              </Typography>
              <Box sx={{ color: '#f40087', fontWeight: 500, mt: 1 }}>
                {caseCategories.map(cat => cat.name).join(' • ')}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="text"
                sx={{ color: '#fff', textTransform: 'none', gap: '10px', fontWeight: '500' }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {[...caseDevelopers].map((dev, i) => (
                    <Avatar
                      key={i}
                      src={dev.avatar ? `https://backend.alazarstudio.ru/uploads/${dev.avatar}` : ''}
                      sx={{
                        ml: i !== 0 ? '-15px' : 0,
                        zIndex: caseDevelopers.length - i, // чтобы первый был сверху
                      }}
                    />
                  ))}
                </Box>
                Разработчики проекта ▾
              </Button>
            </Box>

            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
              }}
            >
              <List sx={{ width: 300, backgroundColor: '#fff', color: '#000' }}>
                {caseDevelopers.map(dev => (
                  <ListItem key={dev.id}>
                    <ListItemAvatar>
                      <Avatar src={dev.avatar ? `https://backend.alazarstudio.ru/uploads/${dev.avatar}` : ''} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={dev.name}
                      secondary={dev.position || 'Без должности'}
                      secondaryTypographyProps={{ sx: { color: '#f40087' } }}
                    />
                  </ListItem>
                ))}
              </List>
            </Popover>
          </Box>

          {/* Все изображения кейса */}
          {caseItem.images?.length > 0 && (
            <Box mt={3} sx={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {caseItem.images.map((img, index) => (
                <Box
                key={index}
                sx={{
                  height: 'auto',
                  overflow: 'hidden',
                  lineHeight: 0,
                }}
              >
                <img
                  src={`https://backend.alazarstudio.ru/uploads/${img}`}
                  alt={`case-img-${index}`}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    transform: 'translateY(+2px)',
                  }}
                />
              </Box>
              
              ))}
              <Box sx={{ position: 'absolute', right: -65, top: 0 , display: 'flex', flexDirection: 'column', gap: 1 }}>
                <a href={`mailto:info@alazarstudio.ru`} target="_blank" rel="noreferrer">
                  <img src="/mail.png" alt="email" width={50} />
                </a>
                <a href="https://wa.me/79283995384" target="_blank" rel="noreferrer">
                  <img src="/whatsapp.png" alt="whatsapp" width={50} />
                </a>
                <a href="https://t.me/alazarstudio" target="_blank" rel="noreferrer">
                  <img src="/telegram.png" alt="telegram" width={50} />
                </a>
              </Box>
            </Box>
          )}



          {/* Мессенджеры */}

        </Box>
      </Box>
    </Drawer >
  );
};

export default CaseModal;
