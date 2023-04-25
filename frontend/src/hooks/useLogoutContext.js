import { useAuthContext } from './useAuthContext';
import { useTagsContext } from './useTagsContext';
import { useProjectsContext } from './useProjectsContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatchTags } = useTagsContext();
  const { dispatchProjects } = useProjectsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');
    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    dispatchTags({ type: 'SET_TAGS', payload: null });
    dispatchProjects({ type: 'SET_PROJECTS', payload: null });
  };

  return { logout };
};
