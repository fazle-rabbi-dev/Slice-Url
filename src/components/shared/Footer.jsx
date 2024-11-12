import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils"

export const Footer = () => {
	const { pathname }= useLocation();
	
	return (
		<footer className="py-8 px-6 text-center border-t-[.5px] border-gray-300 md:px-10 dark:border-gray-700/70">
			<p className='text-sm md:text-lg'>Copyright © 2024-present Slice-Url. Made with &hearts; by <a target="_blank" className="underline font-bold" href="https://fazle-rabbi-dev.vercel.app?source=slice_url_app">Fazle Rabbi.</a></p>
		</footer> 
	);
};
