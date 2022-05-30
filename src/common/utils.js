import { PAGE_QUERY_PARAM_NAME } from "./constants/page-query-param-name";

export const noop = () => {};

export const applyStyleIfHasProperty =
  (propertyName, css, otherwise = "inherit") =>
  (props) =>
    props[propertyName] ? css : otherwise;

export const makeHrefToPage = (urlSearchParams, page, params) => {
  const p = new URLSearchParams(urlSearchParams);
  p.set(PAGE_QUERY_PARAM_NAME, page);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      p.set(key, value);
    });
  }

  return location.pathname + "?" + p.toString();
};
