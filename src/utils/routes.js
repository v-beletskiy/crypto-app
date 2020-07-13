import { appRoutes } from "../data/data";

export const getCurrentRouteName = () => {
  const splittedPathname = window.location.pathname.split("/");
  if (window.location.pathname === "/") {
    return appRoutes.INDEX;
  } else if (
    splittedPathname.length === 3 &&
    splittedPathname.includes("currency")
  ) {
    return appRoutes.CRYPTOCURRENCY_PAGE;
  }
  return appRoutes.INDEX;
};
