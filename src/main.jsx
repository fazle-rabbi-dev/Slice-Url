import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";

import { QueryProvider } from "@/lib/react-query/QueryProvider";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<QueryProvider>
		<React.StrictMode>
			<Router>
				<App />
			</Router>
		</React.StrictMode>
	</QueryProvider>,
);
