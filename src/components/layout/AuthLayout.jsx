import { useEffect } from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import { Header, Footer, PageLoader } from "@/components/shared";
import { MainLayout } from "@/components";
import { useUserStore, useThemeStore } from "@/stores";

export const AuthLayout = () => {
	const { isLoading, isLoggedIn } = useUserStore(state => state);
	const isOnDarkMode = useThemeStore(state => state.isOnDarkMode);
	const location = useLocation();

	if (isLoading) {
		return <PageLoader color={isOnDarkMode && "white"} />;
	}

	if (!isLoading && isLoggedIn) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<>
			<Header />
			<MainLayout className="md:flex-center">
				<section className="w-full md:border-2 border-dashed border-orange-500 md:rounded-lg">
					<div className="bg-white w-full p-8 rounded-lg shadow-lg md:flex md:items-center md:justify-between dark:bg-dark-secondary">
						<Outlet />
						<div className="hidden md:block">
							<img
								className="w-full h-auto"
								src={`/images/${
									location?.pathname === "/sign-in"
										? "sign-in.svg"
										: "sign-up.svg"
								}`}
								alt={`${
									location?.pathname === "/sign-in" ? "Signin" : "Signup"
								} Illustration`}
							/>
						</div>
					</div>
				</section>
			</MainLayout>
			<Footer />
		</>
	);
};
