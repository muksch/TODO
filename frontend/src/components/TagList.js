import { useEffect } from 'react';
import { useTagsContext } from '../hooks/useTagsContext';

import TagDetail from './TagDetail';

const TagList = () => {
  const { tags, dispatchTags } = useTagsContext();

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch('/api/tags');
      const json = await response.json();

      if (response.ok) {
        dispatchTags({ type: 'SET_TAGS', payload: json });
      }
    };

    fetchTags();
  }, [dispatchTags]);

  return <div className="tags">{tags && tags.map((tag) => <TagDetail tag={tag} key={tag._id} />)}</div>;
};

export default TagList;
