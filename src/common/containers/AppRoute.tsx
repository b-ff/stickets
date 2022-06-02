import React, { useMemo } from "react";
import { useSearchParams, useRoutes } from "react-router-dom";
import { calcCurrentPage } from "../../popup/route";

function AppRoute() {
  const [searchParams] = useSearchParams();
  const Component = useMemo(
    () => calcCurrentPage(searchParams).component,
    [searchParams]
  );

  return useRoutes([
    {
      path: window.location.pathname,
      element: <Component />,
    },
  ]);
}

export default AppRoute;
