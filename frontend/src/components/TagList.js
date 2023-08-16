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

  return (
    <div className="tags-list">
      <h2>Tags</h2>
      <div className="customSelect">
        <select name="taglistName" className="taglistName">
          <option value="taglist1">Taglist name 1</option>
          <option value="taglist2">Taglist name 2</option>
          <option value="taglist3">Taglist name 3</option>
        </select>
        <span></span>
        <span></span>
      </div>
      {tags && tags.map((tag) => <TagDetail tag={tag} key={tag._id} />)}
    </div>
  );
};

export default TagList;
