import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils"

export const Footer = () => {
	const { pathname }= useLocation();
	
	return (
		<footer className="border-t-[.5px] border-gray-300 py-8 px-6 md:px-10 text-center dark:border-gray-700/70">
			<p className='text-sm md:text-lg'>Copyright © 2024-present Slice-Url. Made with &hearts; by <a className="underline font-bold" href="https://fazle-rabbi-dev.vercel.app?source=slice-url">Fazle Rabbi.</a></p>
		</footer> 
	);
};
