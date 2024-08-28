import { Link } from "react-router-dom";
import { Button } from "@/components";

export const Hero = () => {
	return (
		<section className="text-center">
			{/* Gradient Effect */}
			<div className="hero-gradient-effect"></div>

			<h1 className="text-5xl font-bold text-gray-700 dark:text-white">Create Short URLs</h1>
			<p className="body-regular mt-6">
				Effortlessly shorten and manage URLs with Slice-Url. Join for free and
				start slicing your links today
			</p>
			<Button
				className="btn-primary h-14 text-lg mt-4"
			>
				<Link to="/sign-up">Get Started With Free 🎉</Link>
			</Button>
		</section>
	);
};
