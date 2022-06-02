import React, { FC, ReactElement, ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { makeHrefToPage } from "../utils";

type AppLinkProps = React.HTMLAttributes<HTMLElement> & {
  to: string;
};

export const AppLink: FC<AppLinkProps> = ({
  to,
  children,
  ...props
}): ReactElement => {
  const [searchParams] = useSearchParams();

  return (
    <Link to={makeHrefToPage(searchParams, to)} {...props}>
      {children}
    </Link>
  );
};
