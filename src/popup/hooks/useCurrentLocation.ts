import { useContext } from 'react';
import { CurrentLocationContext } from '../containers/CurrentLocationContext';

export function useCurrentLocation(): CurrentLocationContextValue {
  return useContext(CurrentLocationContext);
}
