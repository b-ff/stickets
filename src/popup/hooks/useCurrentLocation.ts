import { useContext } from 'react';
import { CurrentLocationContext } from '../contexts/CurrentLocationContext';

export function useCurrentLocation(): CurrentLocationContextValue {
  return useContext(CurrentLocationContext);
}
