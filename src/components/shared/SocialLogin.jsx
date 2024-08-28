export const SocialLogin = ({ handleSocialLogin, disableButton }) => {
  return (
    <div className="mt-3 flex gap-3">
      <button
        disabled={disableButton()}
        className="w-full border-[1px] border-gray-200 rounded-md flex items-center space-x-3 h-14 p-2"
        onClick={() => handleSocialLogin("google")}
        type="button"
      >
        <img className="w-5" src="images/google.png" alt="Google Button" />
        <span>Google</span>
      </button>
      <button
        disabled={disableButton()}
        className="w-full border-[1px] border-gray-200 rounded-md flex items-center space-x-3 h-14 p-2"
        onClick={() => handleSocialLogin("github")}
        type="button"
      >
        <img className="w-5" src="images/github.png" alt="Google Button" />
        <span>Github</span>
      </button>
    </div>
  );
};
