import { useNavigate } from "react-router-dom";

import { signInWithGoogle, signInWithGithub } from "@/lib/firebase/api";
import { useLoginUserAccount, useSocialLogin } from "@/lib/react-query";
import { showToast, showAlert, playSound, LocalStorage } from "@/lib/utils";
import { useUserStore } from "@/stores";


const Capitalize = platform => {
	return platform.split("")[0].toUpperCase() + platform.slice(1);
};

const useLogin = () => {
	const { mutateAsync: loginUserAccount, isPending: isLogining } =
		useLoginUserAccount();
	const { mutateAsync: socialLogin, isPending: isLoginingWithSocial } =
		useSocialLogin();

	const navigate = useNavigate();
	const updateAuthStatus = useUserStore(state => state.updateAuthStatus);

	// =====================================================================================================================
	// Email+Password Login
	// =====================================================================================================================
	const handleEmaiPassLogin = async data => {
		const res = await loginUserAccount(data);
		if (!res) showToast("Something went wrong. Try again.", "error", 4000);

		/* data contains "user" property and user contains: { _id, email, accessToken } */
		const { success, message, data: responseData } = res;

		if (success) {
			showToast(message);
			playSound.success();
			LocalStorage.setItem("user", responseData.user);
			updateAuthStatus(responseData.user);
			navigate("/dashboard");
		} else {
			showAlert("Error!", message, "error");
			playSound.error();
			console.log({
				error: message,
				location: "SignIn.jsx >> handleEmaiPassLogin",
			});
		}
	};

	// =====================================================================================================================
	// Login With (Github/Google)
	// =====================================================================================================================
	const handleSocialLogin = async platform => {
		if (!["google", "github"].includes(platform)) {
			throw new Error("Oopps! invalid platform.");
		}

		try {
			const user = platform === "google" ? await signInWithGoogle() : await signInWithGithub();
			if (!user) {
				throw new Error(
					"Oops! Something went wrong. Maybe you have already an account. Try to login with different platform",
				);
			}

			// Now call api to create user account in db & Login
			const res = await socialLogin({ platform, user });
			console.log({
				message: `${Capitalize(platform)} login status`,
				res,
			});

			if (!res) showToast("Something went wrong. Try again.", "error", 4000);
			const { success, statusCode, message, data: responseData } = res;

			if (success) {
				showToast(message);
				playSound.success();
				LocalStorage.setItem("user", responseData.user);
				updateAuthStatus(responseData.user);
				navigate("/dashboard");
			} else {
				throw new Error(message);
			}
		} catch (error) {
			showAlert("Error!", error.message, "error");
			playSound.error()
			console.log({
				error,
				location: "useLogin.js >> handleSocialLogin",
			});
		}
	};

	return {
		handleEmaiPassLogin,
		handleSocialLogin,
		isLogining,
		isLoginingWithSocial,
	};
};

export default useLogin;
