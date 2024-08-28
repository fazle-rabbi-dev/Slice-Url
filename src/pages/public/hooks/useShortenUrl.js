import { useState, useEffect } from "react";

import { useShortenLinkAnonymously } from "@/lib/react-query";
import { showToast, validateURL, copyToClipboard } from "@/lib/utils";

const useShortenUrl = () => {
	const [link, setLink] = useState("");
	const [createdShortUrls, setCreatedShortUrls] = useState([]);

	// Mutation
	const { mutateAsync: shortenLink, isPending: isLoading } = useShortenLinkAnonymously();

	const handleChange = e => {
		setLink(e.target.value);
	};

	const handleShortenLink = async e => {
		e.preventDefault();
		if (!validateURL(link?.trim())) {
			return showToast("Invalid url.", "error");
		}

		const response = await shortenLink(link);
		if (!response?.success) return showToast("Something went wrong.", "error");

		const {
			message,
			data: { newLink },
		} = response;
		showToast(message);
		setLink("");

		// Display only latest 4 url
		if (createdShortUrls?.length === 4) {
			const filterdUrls = createdShortUrls.slice(0, 3);

			setCreatedShortUrls(currUrls => {
				return [newLink, ...filterdUrls];
			});
		} else {
			setCreatedShortUrls(currUrls => [newLink, ...currUrls]);
		}
	};

	return { link, handleChange, handleShortenLink, isLoading, createdShortUrls };
};

export default useShortenUrl;
