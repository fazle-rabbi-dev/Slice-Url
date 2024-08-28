// TODO: check is auto redirect from api call

import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Loader } from "@/components";
import { redirectToOriginalUrl } from "@/lib/api";

export const HandleRedirect = () => {
	const [isError, setIsError] = useState(false);
	const { shortId } = useParams();
  const [searchParams] = useSearchParams();
  
	const handleRedirection = async () => {
		const res = await redirectToOriginalUrl({ shortId, source: searchParams.get("source") || "unknown" });
		if (res?.success) {
			window.location = res.data.url;
		} else {
			setIsError(  true);
		}
	};

	useEffect(() => {
		if (shortId) handleRedirection();
	}, [shortId]);

	return (
		<section className="text-center">
			{isError ? (
				<h2 className="text-orange-600">
					⚠️ Something went wrong. You may have clicked on a broken URL.
				</h2>
			) : (
				<>
					<h2 className="heading2">Redirecting...</h2>
					<Loader />
				</>
			)}
		</section>
	);
};
