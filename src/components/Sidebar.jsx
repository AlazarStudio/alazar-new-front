import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Drawer } from '@mui/material';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const menuItems = [
    { text: 'Категории', path: '/admin/categories' },
    { text: 'Разработчики', path: '/admin/developers' },
    { text: 'Кейсы', path: '/admin/cases' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <List>
        <Link to={'/'} target='_blank' style={{padding: '8px 16px', marginBottom: '16px', display: 'block'}}><img src="/headerLogo.png" alt="" /></Link>
        {menuItems.map((item) => {
          const isActive =
            currentPath === item.path ||
            (currentPath === '/admin' && item.path === '/admin/categories'); // default

          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={isActive}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
