// src/moduleConfig.js
import TurbineScheme from "./components/TurbineScheme";
import CoolingTowerDiagnostics from "./components/CoolingTowerDiagnostics";
import CoolingTowerScheme from "./components/CoolingTowerScheme";
import Trends from "./components/Trends";

export const moduleConfig = {
  turbine: {
    label: "Турбина",
    submenu: {
      scheme: {
        label: "Схема",
        component: <TurbineScheme />,
        disabled: false,
      },
      trends: {
        label: "Тренды",
        component: <div>Тренды турбины</div>,
        disabled: true,
      },
      diagnostics: {
        label: "Диагностика",
        component: <div>Диагностика турбины</div>,
        disabled: true,
      },
    },
  },

  coolingTower: {
    label: "Градирня",
    submenu: {
      scheme: {
        label: "Схема",
        component: <CoolingTowerScheme />,
        disabled: false,
      },
      trends: {
        label: "Тренды",
        component: <Trends />,
        disabled: false,
      },
      diagnostics: {
        label: "Диагностика",
        component: <CoolingTowerDiagnostics />,
        disabled: false,
      },
    },
  },

  circulationPump: {
    label: "Циркуляционный насос",
    submenu: {
      scheme: {
        label: "Схема",
        component: <div>Модуль в разработке</div>,
        disabled: true,
      },
      trends: {
        label: "Тренды",
        component: <div>Модуль в разработке</div>,
        disabled: true,
      },
      diagnostics: {
        label: "Диагностика",
        component: <div>Модуль в разработке</div>,
        disabled: true,
      },
    },
  },
};
