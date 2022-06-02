import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { makeHrefToPage } from "../utils";

export function AppLink({ to, children, ...props }) {
  const [searchParams] = useSearchParams();
  return (
    <Link to={makeHrefToPage(searchParams, to)} {...props}>
      {children}
    </Link>
  );
}
