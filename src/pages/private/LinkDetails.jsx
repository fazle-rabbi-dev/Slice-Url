import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Clipboard } from "lucide-react";

import {
  useGetLinkByShortId,
  useChangeLinkAlias,
  useDeleteLink
} from "@/lib/react-query";
import { Loader, Button, LinkClickDetails } from "@/components";
import {
  showToast,
  playSound,
  generateShortUrl,
  generateAltShortUrl,
  copyToClipboard
} from "@/lib/utils";

export const LinkDetails = () => {
  const [linkId, setLinkId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [customAlias, setCustomAlias] = useState("");
  const { linkShortId } = useParams();

  const navigate = useNavigate();

  const { data: ApiResponse, isPending: isLoadingLink } =
    useGetLinkByShortId(linkId);
  const { mutateAsync: updateLinkAlias, isPending: isUpdatingLinkAlias } =
    useChangeLinkAlias();
  const { mutateAsync: deleteLink, isPending: isDeletingLink } =
    useDeleteLink();

  let link;
  if (ApiResponse?.success) {
    link = ApiResponse.data.link;
  }

  const toggleModal = () => {
    setOpenModal(cur => !cur);
  };

  const handleAliasUpdate = async e => {
    e.preventDefault();

    if (!customAlias || customAlias.length < 3 || customAlias.length > 10) {
      playSound.error();
      return showToast("Alias must be 3-10 characters long.", "error");
    }

    const ApiResponse = await updateLinkAlias({
      shortId: link.shortId,
      alias: customAlias
    });
    if (!ApiResponse) return showToast("Something went wrong", "error");

    const { success, message, data } = ApiResponse;
    console.log({ data });
    if (success) {
      showToast(message, "success");
      playSound.success();
      setCustomAlias("");
    } else {
      showToast(message, "error", 4000);
      playSound.error();
    }
  };

  const handleDeleteLink = async () => {
    const isConfifm = confirm("Are you sure?");

    if (isConfifm) {
      const ApiResponse = await deleteLink(link.shortId);
      if (ApiResponse?.success) {
        showToast(ApiResponse.message);
        setTimeout(function () {
          // window.location.href = "/";
          navigate("/");
        }, 500);
      } else {
        showToast(ApiResponse.message);
      }
    }
  };

  useEffect(() => {
    if (linkShortId) {
      setLinkId(linkShortId);
    }
  }, [linkShortId]);

  if (isLoadingLink) {
    return <Loader center />;
  }

  if (!isLoadingLink && !link) {
    return (
      <div className="">
        <h2 className="heading2">Link not found!</h2>
        <Link className="text-orange-600 font-cascadia hover:underline" to="/">
          🏕️ Go to home{" "}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="py-8 bg-white shadow-md rounded-lg p-6 dark:bg-dark-secondary">
        <h2 className="heading3 mb-4">Link Details</h2>
        <div className="space-y-4">
          <div>
            <span className="font-semibold">Original URL:</span>
            <p className="text-orange-600 break-all underline text-sm md:text-lg">
              <Link target="_blank" to={link.originalUrl}>
                {link.originalUrl}
              </Link>
            </p>
          </div>
          <div>
            <p className="flex-between">
              <span className="font-semibold">Short Link:</span>
              <button
                onClick={() => copyToClipboard(generateShortUrl(link))}
                className="text-gray-700"
              >
                <Clipboard size={20} />
              </button>
            </p>

            <p className="text-orange-600 break-all underline text-sm md:text-lg">
              <Link target="_blank" to={generateShortUrl(link)}>
                {generateShortUrl(link)}
              </Link>
            </p>

            <ul className="mt-4">
              <h2 className="heading4 mb-3 bg-orange-200 text-orange-600 dark:bg-orange-700/20 dark:text-orange-400">Alternative Short Urls</h2>

              {generateAltShortUrl(link)?.map(shortLink => (
                <li>
                  <p className="flex-between">
                    <span className="font-semibold">Short Link:</span>
                    <button
                      onClick={() => copyToClipboard(shortLink)}
                      className="text-gray-700"
                    >
                      <Clipboard size={20} />
                    </button>
                  </p>
                  <p className="text-orange-600 break-all underline text-sm md:text-lg">
                    <Link target="_blank" to={shortLink}>
                      {shortLink}
                    </Link>
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded-md shadow-lg dark:bg-orange-900/20 dark:text-orange-400">
            <details>
              <summary>README</summary>
              <h2 className="text-lg font-semibold mb-2">
                🔥 Special Feature: Track URL Click Sources
              </h2>
              <p className="mb-4">
                Easily track where your short URLs are getting clicks by adding
                a <strong>source</strong> query parameter to the end of your
                URL. This feature helps you understand the traffic source of
                each click.
              </p>
              <span className="block font-semibold mb-1">Example:</span>
              <code className="block break-all bg-white shadow text-gray-800 p-2 rounded mb-4">
                http://slice-url.vercel.app/n509af3?source=demo
              </code>
              <p>
                Click the "Display All Clicks Info" button below to view
                detailed insights on link clicks, including the sources of those
                clicks.
              </p>
            </details>
          </div>

          {/* Add Link Alias */}
          <div className="">
            <form onSubmit={handleAliasUpdate}>
              <input
                onChange={e => setCustomAlias(e.target.value)}
                placeholder="Set custom link alias"
                className="input-field h-8"
                type="text"
                value={customAlias}
              />
              <Button
                title="Update Alias"
                className="mt-3 btn-secondary h-8"
                full
                disableButton={isUpdatingLinkAlias}
                loadingText="Updaing.."
                type="submit"
              />
            </form>
          </div>

          <div>
            <span className="font-semibold">Alias:</span>
            <p className="body-text">{link.alias || "N/A"}</p>
          </div>
          <div>
            <span className="font-semibold">Total Clicks:</span>
            <p className="body-text">{link.clicks}</p>
          </div>
          <div>
            <span className="font-semibold">Created At:</span>
            <p className="body-text">
              {new Date(link.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <span className="font-semibold">Last Clicked At:</span>
            <p className="body-text">
              {link.clickedAt.length > 0
                ? new Date(
                    link.clickedAt[link.clickedAt.length - 1].time
                  ).toLocaleString()
                : "N/A"}
            </p>
          </div>
          <div>
            <span className="font-semibold">User Agent of Last Click:</span>
            <p className="body-text">
              {link.clickedAt.length > 0
                ? link.clickedAt[link.clickedAt.length - 1].user_agent
                : "N/A"}
            </p>
          </div>

          <Button
            title="Display All Clicks Info"
            className="btn-primary h-14"
            full
            onClick={toggleModal}
          />
          <Button
            title="Delete Link"
            className="btn-secondary h-14"
            full
            onClick={handleDeleteLink}
          />
        </div>
      </div>

      {openModal && (
        <LinkClickDetails
          clickedAt={link.clickedAt}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
};
