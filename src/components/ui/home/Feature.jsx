import FEATURES from "@/constants/FEATURES";

export const Features = () => {
	return (
		<section className="mt-10">
			<ul className="space-y-6">
				{FEATURES?.map(feature => (
					<FeatureCard
						key={feature.title}
						feature={feature}
					/>
				))}
			</ul>
		</section>
	);
};

const FeatureCard = ({ feature }) => {
	const { title, description, icon } = feature;

	return (
		<li className="p-4 rounded-md text-center bg-white/80 shadow dark:shadow-none dark:bg-dark-secondary">
			<p className="my-4">
				<span className="p-4 text-3xl bg-gray-100 shadow rounded-md dark:bg-dark-primary">{icon}</span>
			</p>
			<h2 className="mt-2 heading3 text-gray-700">{title}</h2>
			<p className="mt-2 body-regular">{description}</p>
		</li>
	);
};
