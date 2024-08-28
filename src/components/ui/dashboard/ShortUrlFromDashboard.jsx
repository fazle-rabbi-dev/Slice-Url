import { useState } from 'react'
import { ChevronRight } from "lucide-react"

import { showToast, validateURL } from "@/lib/utils"
import { useShortenLink } from "@/lib/react-query";
import { Loader, Button } from "@/components"

export const ShortUrlFromDashboard = () => {
  const [link, setLink] = useState("");
  const { mutateAsync: shortenLink, isPending: isLoading } = useShortenLink()
  
  const handleChange = (e) => {
    setLink(e.target.value);
  }
  
  const handleShortenUrlClick = async (e) => {
    e.preventDefault();
    
    // Validate input
		if (!validateURL(link)) {
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
  }
  
  return (
    <div className="">
      <h2 className="heading3">
        Create Short URL
      </h2>
      <form onSubmit={handleShortenUrlClick} className="mt-4">
        <input onChange={handleChange} className="input-field py-4 mb-2 md:mb-4" placeholder='Enter an url to shorten it' type="url" id="" value={link} required />
        <Button 
          className="btn-primary h-14 flex-center"
          full
          type="submit"
          disableButton={isLoading}
          loadingText="Shortening.."
        >
          <span>Shorten Link</span>
          <span><ChevronRight /></span>
        </Button>
      </form>
    </div>
  )
}
