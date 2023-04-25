import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('useProjectsContext must be used inside an ProjectsContextProvider');
  }

  return context;
};
