import { Link } from "react-router-dom";

export const Logo = ({ isLoggedIn }) => {
	return (
		<p className="font-cascadia font-bold text-lg md:text-2xl">
			<Link to={isLoggedIn ? "/dashboard" : "/"}>🔗 Slice-URL</Link>
		</p>
	);
};
