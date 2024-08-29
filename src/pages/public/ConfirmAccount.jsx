import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { showToast, cn } from "@/lib/utils";
import { useConfirmAccount } from "@/lib/react-query";
import { Loader } from "@/components";

const invalid_url_error =
  "Something went wrong. You have might clicked on a broken url.";

export const ConfirmAccount = () => {
  const [confirmationStatus, setConfirmationStatus] = useState({
    message: "",
    status: false
  });
  const [searchParams] = useSearchParams();

  const {
    mutateAsync: confirmAccount,
    isPending: isConfirmingAccount,
    isSuccess
  } = useConfirmAccount();
  
  // Confirm Account
  const startAccountConfirmation = async (username, token) => {
    const res = await confirmAccount({
      username,
      token
    });
    if (!res) {
      setConfirmationStatus({ message: invalid_url_error });
      return;
    }

    const { success, message } = res;
    if (success) {
      setConfirmationStatus({ message, status: true });
    } else {
      setConfirmationStatus({ message });
    }
  };

  useEffect(() => {
    const username = searchParams.get("username");
    const token = searchParams.get("token");

    if (!username || !token) {
      setConfirmationStatus(
        "Something went wrong. You have might clicked on a broken url."
      );
    } else {
      startAccountConfirmation(username, token);
    }
  }, []);

  if (isConfirmingAccount || !confirmationStatus.message) {
    return <Loader center />;
  }

  return (
    <section className="">
      <div className="">
        <h2
          className={cn(
            "font-bold text-2xl",
            confirmationStatus.status ? "text-gray-600" : "text-orange-600"
          )}
        >
          {!confirmationStatus.status
            ? "Failed to confirm your account"
            : "Account confirmed successfully"}{" "}
          !
        </h2>
        <p
          className={cn(
            "font-regular mt-4",
            confirmationStatus.status ? "text-black" : "text-orange-600"
          )}
        >
          {confirmationStatus.message}
        </p>
        <Link
          className="mt-4 inline-block font-bold text-black dark:text-white"
          to="/"
        >
          🏕️ Go To Home
        </Link>
      </div>
    </section>
  );
};
