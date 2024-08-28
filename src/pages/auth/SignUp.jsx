import { useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";

import {
	Button,
	Loader,
	SocialLogin,
	FormField,
	FormFooter,
} from "@/components";
import useSignup from "./hooks/useSignUp.js";
import useLogin from "./hooks/useLogin.js";
import { signUpFields } from "@/constants/FORM_FIELDS.js";

export const Signup = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { handleSignup, isCreatingAccount } = useSignup();
	const { handleSocialLogin, isLoginingWithSocial } = useLogin();

	const disableButton = () => {
		return isCreatingAccount || isLoginingWithSocial;
	};

	return (
		<div className="md:w-7/12">
			<h2 className="heading2 text-center text-gray-700">
				🚀 Sign Up
			</h2>
			<p className="my-4 body-text text-center">
				Create your account to start managing and shortening URLs.
			</p>

			<form
				onSubmit={handleSubmit(handleSignup)}
				className="space-y-4"
			>
				{signUpFields?.map(field => (
					<FormField
					  key={field?.name}
						field={field}
						register={register}
						errors={errors}
					/>
				))}

				<Button
					title="Sign Up"
					type="submit"
					className="btn-secondary h-14"
					disableButton={disableButton()}
					full
				/>

				<FormFooter
					parent="signup"
					handleSocialLogin={handleSocialLogin}
					disableButton={disableButton}
				/>
			</form>
		</div>
	);
};
