// src/components/Sidebar.jsx
import React from "react";
import { Drawer, List, ListItemButton, ListItemText, Button, Box } from "@mui/material";
import logo from "../assets/logo.svg"; // путь к логотипу

const Sidebar = ({ items, selectedItem, onSelect, onBack, isSubmenu }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Box sx={{ p: 2, textAlign: "center" }}>
        {/* Логотип */}
        <img src={logo} alt="Логотип компании" style={{ width: "80%", maxWidth: 120, marginBottom: 16 }} />
        
        {/* Кнопка Назад */}
        {isSubmenu && (
          <Button variant="outlined" fullWidth onClick={onBack}>
            Назад
          </Button>
        )}
      </Box>

      {/* Меню */}
      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.id}
            selected={selectedItem === item.id}
            onClick={() => onSelect(item.id)}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
