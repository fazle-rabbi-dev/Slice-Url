import { Link, useLocation } from "react-router-dom";

import NAV_ITEMS from "@/constants/NAV_ITEMS";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo.jsx";
import { NavItem } from "./NavItem.jsx";

export const DesktopMenu = ({ isLoggedIn }) => {
	const location = useLocation();

	const isActiveLink = path => {
		return location.pathname === path;
	};

	return (
		<nav className="hidden md:block">
			<ul className="flex gap-4">
				{NAV_ITEMS.map(item => {
					if (isLoggedIn && ["/sign-in", "/sign-up", "/"].includes(item.url)) {
						return;
					}

					return <NavItem key={item.name} item={item} desktopMenu />
				})}
			</ul>
		</nav>
	);
};
