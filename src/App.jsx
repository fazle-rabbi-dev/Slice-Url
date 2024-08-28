import { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import eruda from "eruda";

import AppRoutes from "./routes";
import { useUserStore } from "@/stores";
import { useThemeStore } from "@/stores";
import { countVisitor } from "@/lib/api";

export default function App() {
	const [searchParams] = useSearchParams();
	const { pathname } = useLocation();

	const checkAuth = useUserStore(state => state.checkAuth);
	const updateTheme = useThemeStore(state => state.updateTheme);

	useEffect(() => {
		// Initiate Eruda console
		eruda.init({
			element: document.getElementById("console"),
			tools: ["console"],
		});

		// Update Auth & Theme State
		(async () => {
			await checkAuth();
		})();
		updateTheme();

		// Track site visitor
		const source = searchParams.get("source");
		const pages = ["/", "/sign-in", "/sign-up", "/dashboard"];
		if (pages.includes(pathname) || pathname.includes("/link-details/")) {
			countVisitor(source);
		}
	}, []);

	return (
		<>
			<AppRoutes />
			<Toaster />
			<p id="console"></p>
		</>
	);
}
