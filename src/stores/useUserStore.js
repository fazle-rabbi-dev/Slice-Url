import { create } from "zustand";

import { getUser } from "@/lib/api";
import { LocalStorage } from "@/lib/utils";

export const useUserStore = create((set, get) => ({
	isLoading: true,
	isLoggedIn: false,
	user: null,

	checkAuth: async () => {
		const response = await getUser();
		if (!response?.success) {
			return set({ isLoading: false, isLoggedIn: false });
		}

		set({
			isLoading: false,
			isLoggedIn: true,
			user: response.data.user,
		});
	},

	updateAuthStatus: user => {
		if (user) {
			set({
				isLoading: false,
				isLoggedIn: true,
				user: user,
			});
		}
	},

	logout: () => {
		LocalStorage.removeItem("user");
		set({
			isLoggedIn: false,
			user: null,
		});
	},
}));
