import { useEffect } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

import { Header, Footer, PageLoader } from "@/components/shared";
import { MainLayout } from "@/components";
import { useUserStore, useThemeStore } from "@/stores";

export const RootLayout = () => {
	const { isLoading, isLoggedIn } = useUserStore(state => state);
	const isOnDarkMode = useThemeStore(state => state.isOnDarkMode);
	const { pathname } = useLocation();
	const publicRoutes = ["/", "/sign-in", "/sign-up"];

	if (isLoading && publicRoutes.includes(pathname)) {
		return <PageLoader color={isOnDarkMode && "white"} />;
	}

	if (!isLoading && isLoggedIn && publicRoutes.includes(pathname)) {
		return <Navigate to="/dashboard" />;
	}

	return (
		<>
			<Header />
			<MainLayout>
				<Outlet />
			</MainLayout>
			<Footer />
		</>
	);
};
