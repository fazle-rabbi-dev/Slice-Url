import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import {
	Button,
	Loader,
	SocialLogin,
	FormField,
	FormFooter,
} from "@/components";
import useLogin from "./hooks/useLogin.js";
import { signInFields } from "@/constants/FORM_FIELDS.js";

export const Signin = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const {
		handleEmaiPassLogin,
		handleSocialLogin,
		isLogining,
		isLoginingWithSocial,
	} = useLogin();

	const disableButton = () => {
		return isLogining || isLoginingWithSocial;
	};

	return (
		<div className="md:w-7/12">
			<h2 className="heading2 text-center text-gray-700">
				🔐 Sign In
			</h2>
			<p className="my-4 body-text text-center">
				Login to your account to start managing and shortening URLs.
			</p>
			<form
				onSubmit={handleSubmit(handleEmaiPassLogin)}
				className="space-y-4"
			>
				{signInFields?.map(field => (
					<FormField
					  key={field?.name}
						field={field}
						register={register}
						errors={errors}
					/>
				))}

				<Button
					title="Sign In"
					type="submit"
					className="btn-secondary h-14"
					disableButton={disableButton()}
					full
					loadingText="Signing in.."
				/>

				<FormFooter
					parent="signin"
					handleSocialLogin={handleSocialLogin}
					disableButton={disableButton}
				/>
			</form>
		</div>
	);
};
