import { Loader } from "@/components";
import { cn } from "@/lib/utils";

export const Button = ({
	full=false,
	title="Default Title",
	type = "button",
	onClick=null,
	disableButton=false,
	children=null,
	className="",
	loadingText="Loading..",
}) => {
	return (
		<button
			className={cn("btn-base", className, { "w-full": full })}
			disabled={disableButton}
			type={type}
			onClick={onClick}
			aria-disabled={disableButton}
		>
			{disableButton ? (
				<span className="flex-center gap-2">
					{loadingText} <Loader color="white" />
				</span>
			) : children ? (
				children
			) : (
				<span>{title}</span>
			)}
		</button>
	);
};
