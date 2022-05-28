export const noop = () => {};

export const applyStyleIfHasProperty =
  (propertyName, css, otherwise = "inherit") =>
  (props) =>
    props[propertyName] ? css : otherwise;
