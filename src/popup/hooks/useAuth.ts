import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
