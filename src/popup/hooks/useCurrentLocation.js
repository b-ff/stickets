import { useContext } from "react";
import { CurrentLocationContext } from "../containers/CurrentLocationContext";

export const useCurrentLocation = () => {
  return useContext(CurrentLocationContext);
};
