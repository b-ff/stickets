import { useContext } from 'react';
import { AuthContext } from '../containers/AuthContext';

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
