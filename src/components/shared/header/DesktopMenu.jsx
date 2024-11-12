import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

import NAV_ITEMS from "@/constants/NAV_ITEMS";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo.jsx";
import { NavItem } from "./NavItem.jsx";
import { useUserStore } from "@/stores";


export const DesktopMenu = ({ isLoggedIn }) => {
  const location = useLocation();

  const { logout } = useUserStore(state => ({
    isLoggedIn: state.isLoggedIn,
    logout: state.logout
  }));
  
  const handleLogout = () => {
		const isConfirmed = confirm("Are you sure?");
		if (isConfirmed) {
			logout();
		}
	};
  
  const isActiveLink = path => {
    return location.pathname === path;
  };

  return (
    <nav className="flex-1 hidden md:flex items-center justify-between z-50">
      <ul className="flex gap-4">
        {NAV_ITEMS.map(item => {
          if (isLoggedIn && ["/sign-in", "/sign-up", "/"].includes(item.url)) {
            return;
          }

          return (
            <NavItem
              key={item.name}
              item={item}
              desktopMenu
            />
          );
        })}
      </ul>
      {
        isLoggedIn && (
          <button
            onClick={handleLogout}
            className="btn-base btn-primary flex-center py-2"
            type="button"
          >
            <span>Logout</span>
            <LogOut size={17} />
          </button>
        )
      }
    </nav>
  );
};
