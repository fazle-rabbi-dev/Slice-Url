import FadeLoader from "react-spinners/ClipLoader";

export const Loader = ({ color, center }) => {
	return (
		<span className={center && "flex justify-center items-center"}>
			<FadeLoader
				color={color || "#b1b1b1"}
				// loading={loading}
				// cssOverride={override}
				size={20}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</span>
	);
};
