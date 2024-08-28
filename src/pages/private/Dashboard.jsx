import { useState, useEffect } from "react";

import { ShortUrlFromDashboard, LinkTable, Loader } from "@/components";
import { useUserStore } from "@/stores";
import { useGetLinks } from "@/lib/react-query";

export const Dashboard = () => {
	const isLoggedIn = useUserStore(state => state.isLoggedIn);
	const user = useUserStore(state => state.user);
	const {
		data: ApiResponse,
		isPending: isLoadingLinks,
		isError,
	} = useGetLinks(isLoggedIn);
  
	return (
		<>
			<section className="w-full">
			  <ShortUrlFromDashboard />
				<div className="flex-1 mt-8 md:mt-12">
  				<h2 className="heading3">All Links</h2>
          <p className="font-light">
            Total Links: {ApiResponse?.data.links.length || 0}
          </p>
          
          
  				{isLoadingLinks ? (
  					<p className="my-4">
  					  <Loader center />
  					</p>
  				) : (
  					<LinkTable Links={ApiResponse?.data.links} />
  				)}
				</div>
			</section>
		</>
	);
};
