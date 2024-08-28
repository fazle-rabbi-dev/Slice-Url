import { Link } from "react-router-dom";
import { SocialLogin } from "@/components";
import { capitalizeFirstLetter } from "@/lib/utils";

export const FormFooter = ({ parent, handleSocialLogin, disableButton }) => {
	const url = parent === "signup" ? "/sign-in" : "/sign-up";
	const message = parent === "signin" ? "Don't" : "Already";

	return (
		<>
			<div className="">
				<div className="mt-7 flex items-center gap-1">
					<span className="h-[.5px] flex-1 bg-gray-300"></span>
					<span className="body-text">Or Continue With</span>
					<span className="h-[.5px] flex-1 bg-gray-300"></span>
				</div>

				<SocialLogin
					handleSocialLogin={handleSocialLogin}
					disableButton={disableButton}
				/>
			</div>

			<p className="body-text text-center">
				{message} have an account?{" "}
				<Link
					className="underline text-black dark:text-white"
					to={url}
				>
					{parent === "signup" ? "Signin" : "Signup"}
				</Link>
			</p>
		</>
	);
};
