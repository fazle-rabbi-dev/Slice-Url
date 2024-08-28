import { Routes, Route } from "react-router-dom";

import { Home, HandleRedirect, NotFound } from "@/pages/public";
import { Signin, Signup } from "@/pages/auth";
import { Dashboard, LinkDetails, Profile } from "@/pages/private";
import { RootLayout, AuthLayout, PrivateLayout } from "@/components/layout";


const AppRoutes = () => {
	return (
		<Routes>
			{/* Public Routes */}
			<Route element={<RootLayout />}>
				<Route
					index
					element={<Home />}
				/>
				<Route
					path="/:shortId"
					element={<HandleRedirect />}
				/>
				<Route
					path="*"
					element={<NotFound />}
				/>
			</Route>

			{/* Auth Routes */}
			<Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
      </Route>

			{/* Private Routes */}
			<Route element={<PrivateLayout />}>
				<Route
					path="/dashboard"
					element={<Dashboard />}
				/>
				<Route
					path="/link-details/:linkShortId"
					element={<LinkDetails />}
				/>
				<Route
					path="/profile"
					element={<Profile />}
				/>
			</Route>
		</Routes>
	);
};

export default AppRoutes;
