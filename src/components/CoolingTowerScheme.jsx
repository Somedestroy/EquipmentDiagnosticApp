import React, { useState } from "react";
import CoolingTowerSchematic from "../assets/CoolingTower.png"; // 

const CoolingTowerScheme = () => {
  // Состояние для отображения всплывающего описания (demo)
  const [selectedPart, setSelectedPart] = useState(null);

  return (
    <div className="relative w-full h-full">
      <img
        src={CoolingTowerSchematic}
        alt="3D модель градирни"
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

export default CoolingTowerScheme;
