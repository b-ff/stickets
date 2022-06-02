import { Context, useContext } from "react";
import { CurrentLocationContext } from "../containers/CurrentLocationContext";

export const useCurrentLocation = (): URL | null => {
  return useContext(CurrentLocationContext);
};
