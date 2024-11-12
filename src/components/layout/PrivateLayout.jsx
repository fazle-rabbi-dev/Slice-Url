import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Header, Footer, PageLoader } from "@/components/shared";
import { MainLayout } from "@/components";
import { useUserStore, useThemeStore } from "@/stores";

export const PrivateLayout = () => {
  const { isLoading, isLoggedIn, user } = useUserStore(state => state);
  const isOnDarkMode = useThemeStore(state => state.isOnDarkMode);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      return navigate("/sign-in", { replace: true });
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    return <PageLoader color={isOnDarkMode && "white"} />;
  }

  return (
    <>
      <Header />
      <MainLayout>
        <Outlet />
      </MainLayout>
      <Footer />
    </>
  );
};
