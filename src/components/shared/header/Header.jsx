import { useState } from "react";
import { AlignJustify, Moon, Sun, CircleUser, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import { useUserStore } from "@/stores";
import { useThemeStore } from "@/stores";
import { cn } from "@/lib/utils";
import { MobileDrawer } from "./MobileDrawer.jsx";
import { DesktopMenu } from "./DesktopMenu.jsx";
import { Logo } from "./Logo.jsx";


export const Header = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
  
  // Global states 
	const { isLoggedIn, logout, user } = useUserStore(state => ({
		isLoggedIn: state.isLoggedIn,
		logout: state.logout,
		user: state.user,
	}));
	const { isOnDarkMode, switchTheme } = useThemeStore(state => ({
		switchTheme: state.switchTheme,
		isOnDarkMode: state.isOnDarkMode,
	}));

	const closeDrawer = () => {
		setOpenDrawer(false);
	};

	const handleLogout = () => {
		const isConfirmed = confirm("Are you sure?");
		if (isConfirmed) {
			logout();
		}
	};

	return (
		<header
			className="header bg-white/80 dark:bg-dark-secondary/80"
		> 
		  {/* Left Part */}
			<div className="flex items-center gap-5">
				<button
					onClick={() => setOpenDrawer(true)}
					className="md:hidden"
					type="button"
				>
					<AlignJustify />
				</button>
				<Logo isLoggedIn={isLoggedIn} />
				<DesktopMenu isLoggedIn={isLoggedIn} />
			</div>
      
      {/* Right Part */}
			<div className="flex gap-3 justify-center items-center">
				{isLoggedIn && (
					<>
					<button
						className="bg-orange-200 text-orange-600 rounded-full p-2 cursor-pointer dark:bg-orange-800/40 dark:text-orange-400"
						type="button"
					>
						<Link to="/profile"><CircleUser size={17} /></Link>
					</button>
					</>
				)}
				
				{/* 2 dark mode button > one for small & one for medium screen */}
				<button
					onClick={switchTheme}
					type="button"
					className="cursor-pointer md:hidden"
				>
					{isOnDarkMode ? <Sun /> : <Moon />}
				</button>
				<button
					onClick={switchTheme}
					type="button"
					className="hidden md:block cursor-pointer"
				>
					{isOnDarkMode ? <Sun size={35} /> : <Moon size={35} />}
				</button>
			</div>

			<MobileDrawer
				openDrawer={openDrawer}
				closeDrawer={closeDrawer}
				isLoggedIn={isLoggedIn}
				user={user}
				handleLogout={handleLogout}
			/>
		</header>
	);
};
