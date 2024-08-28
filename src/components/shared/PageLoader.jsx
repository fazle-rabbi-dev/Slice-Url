// import ClipLoader from "react-spinners/ClipLoader";
import GridLoader from "react-spinners/ClipLoader";

export const PageLoader = ({ color }) => {
  
  console.log({ color })
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <GridLoader
        color={color || "#181818"}
        // loading={loading}
        // cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

