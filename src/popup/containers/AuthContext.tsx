import { createContext } from 'react';
import { noop } from '../../common/utils';

export const AuthContext = createContext<AuthContextValue>([true, noop]);
