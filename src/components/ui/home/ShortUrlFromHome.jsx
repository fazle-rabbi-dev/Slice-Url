import { ChevronRight, Pointer, Clipboard } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components";
import useShortenUrl from "@/pages/public/hooks/useShortenUrl.js";
import { copyToClipboard } from "@/lib/utils";
import { generateShortUrl } from "@/lib/utils";

export const ShortUrlFromHome = () => {
	const { link, handleChange, handleShortenLink, isLoading, createdShortUrls } = useShortenUrl();
  
	return (
		<section className="mt-10 space-y-4">
			<form onSubmit={handleShortenLink}>
				<input
					onChange={handleChange}
					className="input-field py-4 md:mb-4"
					placeholder="Enter an url to shorten it"
					type="text"
					value={link}
					required
				/>
				<Button
					className="mt-2 btn-secondary h-14 flex-center"
					type="submit"
					full
					disableButton={isLoading}
					loadingText="Shortening.."
				>
				  <span>Shorten Link</span>
				  <span><ChevronRight /></span>
				</Button>
			</form>

			{/* Display Generated Short Urls */}
			<div className="">
				{createdShortUrls?.length > 0 && (
					<div
						role="alert"
						class="rounded border-s-4 border-orange-500 bg-orange-50 p-4"
					>
						<strong class="block font-medium text-orange-800"> Note: </strong>

						<p class="mt-2 text-sm text-orange-700">
							Create a free account today to shorten unlimited URLs and unlock all features!
						</p>
					</div>
				)}

				<ul className="mt-4 space-y-2">
					{createdShortUrls?.length > 0 &&
						createdShortUrls.map(shortLink => (
							<li
								key={shortLink._id}
								className="bg-white shadow shadow-sm text-black p-2 rounded-md flex-between gap-2"
							>
								<Link
									className="flex flex-wrap items-center gap-2 body-text"
									to={generateShortUrl(shortLink)}
									target="_blank"
								>
									<span className="break-all text-orange-800">{generateShortUrl(shortLink)}</span>
								</Link>

								<button
									className="p-1 rounded bg-white text-gray-600 shadow"
									onClick={() => copyToClipboard(shortLink.shortUrl)}
								>
									<Clipboard size={17} />
								</button>
							</li>
						))}
				</ul>
			</div>
		</section>
	);
};
