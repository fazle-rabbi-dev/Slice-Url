import { useState, useEffect } from 'react'
import { X, Search } from "lucide-react"
import { convertMongoDBDate } from "@/lib/utils"

export const LinkClickDetails = ({ clickedAt, toggleModal }) => {
  const [searchValue, setSearchValue] = useState("");
  const [clickDetails, setClickDetails] = useState([]);
  
  const handleSearch = (e) => {
    const value = e.target.value?.toLowerCase();
    setSearchValue(value);
    
    let filteredClickDetails;
    if(value?.length > 0){
      filteredClickDetails = clickedAt.filter(item => item.source?.toLowerCase().startsWith(searchValue));
      console.log({ filteredClickDetails })
    } else {
      filteredClickDetails = clickedAt;
    }
    setClickDetails(filteredClickDetails);
  };
  
  const handleModalOutsideClick = e => {
		if (e.target === e.currentTarget) {
			toggleModal();
		}
	};
  
  useEffect(() => {
    setClickDetails(clickedAt.reverse());
  },[]);
  
  return (
    <div onClick={handleModalOutsideClick} className="fixed top-0 bottom-0 left-0 right-0 h-screen w-full bg-gray-800/70 flex-center px-6 py-14 md:px-10 dark:bg-dark-primary/70">
      <div className="h-full w-full max-w-2xl overflow-auto bg-white rounded-lg p-5 dark:bg-dark-secondary ">
        <div className="flex-end">
          <button onClick={toggleModal} className="bg-gray-100 p-2 rounded-md dark:bg-dark-primary">
            <X />
          </button>
        </div>
        
        <div className="">
          <h2 className="heading4 font-cascadia">
            All Clicks Details
          </h2>
          
          <ul className="mt-4 space-y-4">
            <p>
              Total Clicks: {clickDetails?.length || 0}
            </p>
            
            {/* Filter Click Source */}
            <div className="h-10 rounded-md border-[.6px] border-gray-400 px-2 flex items-center gap-2">
              <span><Search /></span>
              <input onChange={handleSearch} className='outline-0 bg-transparent' placeholder='Search by source' type="text" value={searchValue} />
            </div>
            
            {
              clickDetails?.length > 0 ? clickDetails.map(item => (
                  <li className="body-text p-2 rounded-md border-[.6px] border-gray-300 space-y-4">
                    <p>
                      <span className="body-semibold">Time: </span>{convertMongoDBDate(item.time).Date} • {convertMongoDBDate(item.time).Time}
                    </p>
                    <p>
                      <span className="body-semibold">User Agent: </span>{item.user_agent}
                    </p>
                    <p>
                      <span className="body-semibold">Source: </span> {item.source || "N/A"}
                    </p>
                  </li>
                )) : (
                    <p className='text-orange-700 dark:text-orange-200 font-cascadia'>
                      No result found.
                    </p>
                    
                  )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

