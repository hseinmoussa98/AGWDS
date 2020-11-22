// Icons
import React from "react";
import {
  FiHome,
  FiBookmark,
  FiAperture,
  FiPhoneForwarded,
  FiBookOpen,
  FiInfo,
} from "react-icons/fi";

const INITIAL_STATE = {
  activeMenu: {
    name: "Dashboard",
    icon: <FiHome />,
    path: "/",
  },
  itens: [
    {
      name: "Dashboard",
      icon: <FiHome />,
      path: "/",
    },

    {
      name: "Buttons",
      icon: <FiAperture />,
      path: "/buttons",
    },
    {
      name: "New Admin",
      icon: <FiBookmark />,
      path: "/cards",
    },
    {
      name: "Forms",
      icon: <FiPhoneForwarded />,
      path: "/forms",
    },
    {
      name: "Alerts",
      icon: <FiInfo />,
      path: "/alerts",
    },
    {
      name: "Modals",
      icon: <FiBookOpen />,
      path: "/modals",
    },
  ],
};

export default function sidebarMenu(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_MENU_ACTIVE":
      return { ...state, activeMenu: action.menu };
      break;
    default:
      return state;
      break;
  }
}
