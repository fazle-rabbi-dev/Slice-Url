import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Clipboard } from "lucide-react";

import { cn, generateShortUrl, copyToClipboard } from "@/lib/utils";

export const LinkTable = ({ Links }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [currentLinks, setCurrentLinks] = useState([]);
	const navigate = useNavigate();

	const linksPerPage = 10;
	const totalPages = Math.ceil(Links?.length / linksPerPage);

	const handlePageChange = pageNumber => {
		// Calculate the index of the first and last link on the current page
		const indexOfLastLink = pageNumber * linksPerPage;
		const indexOfFirstLink = indexOfLastLink - linksPerPage;
		const newLinks = Links?.slice(indexOfFirstLink, indexOfLastLink);

		setCurrentPage(pageNumber);
		setCurrentLinks(newLinks);
	};

	useEffect(() => {
		handlePageChange(1);
	}, [Links]);

	// Calculate the range of pages to show
	const pagesToShow = 7; // Number of page buttons to show
	const startPage = Math.max(
		1,
		Math.min(currentPage - Math.floor(pagesToShow / 2), totalPages - pagesToShow + 1),
	);
	const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

	const generatePageButtons = () => {
		let buttons = [];
		for (let i = startPage; i <= endPage; i++) {
			buttons.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={cn(
						"mx-1 px-3 py-1 rounded",
						currentPage === i
							? "bg-orange-500 text-white"
							: "bg-gray-200 text-gray-700 hover:bg-gray-300",
					)}
				>
					{i}
				</button>,
			);
		}
		return buttons;
	};

	if (Links?.length === 0) {
		return (
			<span className="text-orange-800 text-sm font-light">
				You haven't created any short URL yet!
			</span>
		);
	}

	return (
		<div className="mt-6">
			<div className="bg-white border border-gray-300 rounded-md dark:bg-dark-secondary">
				<table className="w-full">
					<thead>
						<tr>
							<th className="py-2 px-4 border-b">Short Link</th>
							<th className="py-2 px-4 border-b">Details</th>
						</tr>
					</thead>
					<tbody>
						{currentLinks?.map(link => (
							<tr key={link._id}>
								<td className="py-2 px-4 space-y-2 border-b break-all body-text">
									<Link
										target="_blank"
										to={generateShortUrl(link)}
										className="underline cursor-pointer"
									>
										{generateShortUrl(link)}
									</Link>
									<p className="text-orange-600">{link.originalUrl}</p>
								</td>
								<td className="py-2 px-4 border-b flex flex-col gap-2">
									<button
										onClick={() => navigate(`/link-details/${link.shortId}`)}
										className="bg-gray-900 text-white py-1 px-3 rounded cursor-pointer hover:bg-orange-600 dark:bg-white dark:text-gray-700"
									>
										Details
									</button>
									<button
										onClick={() => copyToClipboard(generateShortUrl(link))}
										className="flex-center gap-2 bg-gray-100 text-gray-900 shadow py-1 px-3 rounded cursor-pointer hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
									>
										<span>Copy</span>
										<Clipboard size={20} />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex justify-center mt-4">{generatePageButtons()}</div>
		</div>
	);
};
