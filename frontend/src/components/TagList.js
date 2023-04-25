import { useEffect } from 'react';
import { useTagsContext } from '../hooks/useTagsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import TagDetail from './TagDetail';

const TagList = () => {
  const { tags, dispatchTags } = useTagsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch('/api/tags', {
        headers: {
          Authorization: `Baerer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatchTags({ type: 'SET_TAGS', payload: json });
      }
    };

    if (user) {
      fetchTags();
    }
  }, [dispatchTags, user]);

  return <div className="tags">{tags && tags.map((tag) => <TagDetail tag={tag} key={tag._id} />)}</div>;
};

export default TagList;
