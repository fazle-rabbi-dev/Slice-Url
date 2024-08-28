import { create } from "zustand";
import { LocalStorage } from "@/lib/utils";

export const useThemeStore = create((set, get) => ({
	isOnDarkMode: false,

	switchTheme: () => {
		const isOnDarkMode = get().isOnDarkMode;
		LocalStorage.setItem(
			"theme",
			isOnDarkMode ? "light" : "dark",
		);
		if(isOnDarkMode) {
		  document.documentElement.classList.remove("dark");
		} else {
		  document.documentElement.classList.add("dark");
		}
		set({ isOnDarkMode: !isOnDarkMode });
	},

	updateTheme: () => {
		const savedTheme = LocalStorage.getItem("theme");
		if (!savedTheme) return;
		if (savedTheme === "dark") {
			document.documentElement.classList.add("dark");
		}
		set({
			isOnDarkMode: savedTheme === "dark" ? true : false,
		});
	},
}));
