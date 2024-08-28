import ReactDOM from "react-dom";
import { X, Rocket, LogOut } from "lucide-react";

import NAV_ITEMS from "@/constants/NAV_ITEMS";
import { cn } from "@/lib/utils";
import { NavItem } from "./NavItem.jsx";
import { Logo } from "./Logo.jsx";

export const MobileDrawer = ({ openDrawer, closeDrawer, isLoggedIn, user, handleLogout }) => {
	const handleDrawerOutsideClick = e => {
		if (e.target === e.currentTarget) {
			closeDrawer();
		}
	};

	return ReactDOM.createPortal(
		<div
			onClick={handleDrawerOutsideClick}
			className={cn(
				"opacity-0 fixed top-0 right-0 left-0 w-full h-[100vh] pointer-events-none transition-all duration-100 ease-linear",
				{ "opacity-1 bg-black/40 backdrop-blur-sm pointer-events-auto": openDrawer },
			)}
		>
			<div
				className={cn(
					"-ml-[100vw] w-[75vw] h-full bg-white px-6 py-6 transition-all duration-150 ease-linear dark:bg-dark-secondary",
					{ "ml-0": openDrawer },
				)}
			>
				<div className="flex-between">
					<Logo isLoggedIn={isLoggedIn} />
					<button
						onClick={closeDrawer}
						className="flex justify-end bg-white shadow p-2 rounded-md dark:bg-dark-primary"
						type="button"
					>
						<X size={20} />
					</button>
				</div>

				{isLoggedIn && (
					<div className="my-4 pb-4 border-b-[.5px] border-gray-200">
						<p className="font-medium">Hey 👋, {user?.fullName}</p>
						<p className="text-sm font-light">Welcome back!</p>
					</div>
				)}

				<nav>
					<ul className="mt-4 flex flex-col gap-4">
						{NAV_ITEMS.map(item => {
							if (isLoggedIn && ["/sign-in", "/sign-up", "/"].includes(item.url)) {
								return;
							}

							return (
								<NavItem
									key={item.name}
									item={item}
									closeDrawer={closeDrawer}
								/>
							);
						})}
					</ul>
				</nav>

				{isLoggedIn && (
					<div className="mt-4 pt-4 border-t-[.5px] border-gray-200">
						<div className="">
							<p className="text-sm">📬 {user?.email}</p>
						</div>
						<button
							onClick={handleLogout}
							className="btn-base btn-primary w-full mt-2 flex-center py-4 gap-2"
							type="button"
						>
							<span>Logout</span>
							<LogOut size={17} />
						</button>
					</div>
				)}
			</div>
		</div>,
		document.getElementById("mobile-drawer-root"),
	);
};
