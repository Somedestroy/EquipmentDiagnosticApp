import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import { moduleConfig } from "./moduleConfig";
import { Box, Typography } from "@mui/material";

function App() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [subModule, setSubModule] = useState(null);

  const handleSelect = (id) => {
    const items = selectedModule
      ? moduleConfig[selectedModule].submenu
      : moduleConfig;

    const item = items[id];

    if (item.disabled) return;

    if (!selectedModule) {
      setSelectedModule(id);
    } else {
      setSubModule(id);
    }
  };

  const handleBack = () => {
    setSelectedModule(null);
    setSubModule(null);
  };

  const isSubmenu = !!selectedModule;

  const currentItems = isSubmenu
    ? Object.entries(moduleConfig[selectedModule].submenu).map(([key, value]) => ({
        id: key,
        label: value.label,
        disabled: value.disabled || false,
      }))
    : Object.entries(moduleConfig).map(([key, value]) => ({
        id: key,
        label: value.label,
        disabled: value.disabled || false,
      }));

  const content = subModule
    ? moduleConfig[selectedModule].submenu[subModule]?.component
    : <Typography variant="h5">Выберите подраздел</Typography>;

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar
        items={currentItems}
        selectedItem={subModule || selectedModule}
        onSelect={handleSelect}
        onBack={isSubmenu ? handleBack : undefined}
        isSubmenu={isSubmenu}
      />
      <Box sx={{ flexGrow: 1, p: 3 }}>{content}</Box>
    </Box>
  );
}

export default App;
