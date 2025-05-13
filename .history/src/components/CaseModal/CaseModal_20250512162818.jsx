import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Drawer,
  Button,
  Popover,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import styles from './CaseModal.module.css';

const CaseModal = ({
  open,
  onClose,
  caseItem,
  allDevelopers,
  allCategories,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  if (!caseItem) return null;

  const caseCategories = allCategories.filter((cat) =>
    caseItem.categoryIds.includes(cat.id)
  );
  const caseDevelopers = allDevelopers.filter((dev) =>
    caseItem.developerIds.includes(dev.id)
  );

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      ModalProps={{
        BackdropProps: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          },
        },
      }}
      PaperProps={{
        sx: {
          background: 'none',
          boxShadow: 'none',
        },
      }}
    >
      <Box className={styles.modalRoot}>
        {/* Кнопка закрытия */}
        {/* <IconButton onClick={onClose} className={styles.closeButton}>
          <Close />
        </IconButton> */}
        <div onClick={onClose} className={styles.closeButton}>
          X
        </div>

        <Box className={styles.messengerBlockTop}>
          <a
            href="mailto:info@alazarstudio.ru"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/mail.png" alt="email" width={50} />
          </a>
          <a href="https://wa.me/79283995384" target="_blank" rel="noreferrer">
            <img src="/whatsapp.png" alt="whatsapp" width={50} />
          </a>
          <a href="https://t.me/alazarstudio" target="_blank" rel="noreferrer">
            <img src="/telegram.png" alt="telegram" width={50} />
          </a>
        </Box>

        {/* Контент */}
        <Box className={styles.container}>
          <Box className={styles.topRow}>
            <Box>
              <Typography className={styles.title}>{caseItem.title}</Typography>
              <Box className={styles.categories}>
                {caseCategories.map((cat) => cat.name).join(' • ')}
              </Box>
            </Box>

            {/* Разработчики */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {caseDevelopers.length === 1 ? (
                // Один разработчик — показываем просто
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    src={`https://backend.alazarstudio.ru/uploads/${caseDevelopers[0].avatar}`}
                  />
                  <Typography>{caseDevelopers[0].name}</Typography>
                  <Typography>{caseDevelopers[0].name}</Typography>
                </Box>
              ) : (
                // Несколько — кнопка с аватарками и поповером
                <Button
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  className={styles.devButton}
                >
                  <Box className={styles.devAvatars}>
                    {caseDevelopers.map((dev, i) => (
                      <Avatar
                        key={i}
                        src={
                          dev.avatar
                            ? `https://backend.alazarstudio.ru/uploads/${dev.avatar}`
                            : ''
                        }
                        style={{
                          marginLeft: i !== 0 ? '-15px' : 0,
                          zIndex: caseDevelopers.length - i,
                        }}
                      />
                    ))}
                  </Box>
                  Разработчики проекта ▾
                </Button>
              )}
            </Box>
          </Box>

          {/* Поповер с разработчиками */}
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom' }}
          >
            <List className={styles.popoverList}>
              {caseDevelopers.map((dev) => (
                <ListItem key={dev.id}>
                  <ListItemAvatar>
                    <Avatar
                      src={
                        dev.avatar
                          ? `https://backend.alazarstudio.ru/uploads/${dev.avatar}`
                          : ''
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={dev.name}
                    secondary={dev.position || 'Без должности'}
                    secondaryTypographyProps={{ className: styles.devRole }}
                  />
                </ListItem>
              ))}
            </List>
          </Popover>

          {/* Изображения кейса */}
          <Box className={styles.imagesWrapper}>
            {caseItem.images.map((img, index) => (
              <Box key={index} className={styles.imageBox}>
                <img
                  src={`https://backend.alazarstudio.ru/uploads/${img}`}
                  alt={`case-img-${index}`}
                  className={styles.image}
                />
              </Box>
            ))}
            <Box className={styles.messengerBlockMobile}>
              <a
                href="mailto:info@alazarstudio.ru"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/mail.png" alt="email" width={50} />
              </a>
              <a
                href="https://wa.me/79283995384"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/whatsapp.png" alt="whatsapp" width={50} />
              </a>
              <a
                href="https://t.me/alazarstudio"
                target="_blank"
                rel="noreferrer"
              >
                <img src="/telegram.png" alt="telegram" width={50} />
              </a>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CaseModal;
