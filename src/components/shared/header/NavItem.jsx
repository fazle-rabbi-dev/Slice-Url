import { Link, useLocation } from "react-router-dom";
import { Rocket } from "lucide-react";

import { cn } from "@/lib/utils";

export const NavItem = ({ item, closeDrawer, desktopMenu }) => {
	const location = useLocation();

	const isActiveLink = path => {
		return location.pathname === path;
	};

	return (
		<li
			onClick={closeDrawer}
			className={cn(
			    "cursor-pointer hover:text-orange-400",
			    { 
			      "text-orange-500 font-bold underline": isActiveLink(item.url)
			    }, 
			    desktopMenu ? "text-lg" : "text-md"
			 )}
		>
			<Link
				target={item?.newTab && "_blank"}
				className="flex items-center gap-2"
				to={item.url}
			>
				{item.name}
				{item.name.includes("Developer") && (
					<span>
						<Rocket size={20} />
					</span>
				)}
			</Link>
		</li>
	);
};
