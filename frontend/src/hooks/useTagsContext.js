import { TagsContext } from '../context/TagsContext';
import { useContext } from 'react';

export const useTagsContext = () => {
  const context = useContext(TagsContext);

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider');
  }

  return context;
};
