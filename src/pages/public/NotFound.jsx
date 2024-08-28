export const NotFound = () => {
	return (
		<section className="font-patrickhand text-2xl h-full flex flex-col justify-center items-center md:min-h-screen">
			<img
				src="/images/404.svg"
				alt="Page Not Found"
				width="100%"
				height="auto"
			/>
			<div className="flex gap-2 justify-center items-center">
				<p className="font-bold font-black">404</p>
				<span> | </span>
				<p className="">Page Not Found</p>
			</div>
		</section>
	);
};
