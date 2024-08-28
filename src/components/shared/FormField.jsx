import { cn } from "@/lib/utils";

const className = (errors, type) => (
	cn(
		"form-field",
		{
			"border-red-500": errors[type],
			"border-gray-300": !errors[type],
		},
	));

export const FormField = ({
	field: { label, name, type, options },
	register,
	errors,
}) => {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 md:text-lg">{label}</label>
			<input
				type={type}
				className={className(errors, type)}
				{...register(name, options)}
			/>
			{errors[name] && (
				<span className="text-red-500 text-sm">{errors[name].message}</span>
			)}
		</div>
	);
};
