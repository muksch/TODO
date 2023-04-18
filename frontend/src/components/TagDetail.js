import { useTagsContext } from '../hooks/useTagsContext';

const TagDetail = ({ tag }) => {
  const { tags, dispatchTags } = useTagsContext();

  const handleClick = async (e) => {
    const updatedTags = tags.filter((t) => t._id !== tag._id).map((t, i) => ({ ...t, order: i + 1 }));
    const response = await fetch('api/tags/' + tag._id, {
      method: 'DELETE',
    });

    if (response.ok) {
      const updateResponse = await fetch('api/tags/updateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTags),
      });
      if (updateResponse.ok) {
        const json = await updateResponse.json();
        dispatchTags({ type: 'UPDATE_TAGS', payload: json });
      }
    }
  };

  return (
    <div className="tag-details" style={{ background: tag.color }}>
      <h4>{tag.title}</h4>
      <span onClick={handleClick} className="material-icons">
        close
      </span>
    </div>
  );
};

export default TagDetail;
