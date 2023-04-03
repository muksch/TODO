import { useEffect, useState } from 'react';
import { useTagsContext } from '../hooks/useTagsContext';

const TagForm = () => {
  const { tags, dispatchTags } = useTagsContext();

  const [title, setTitle] = useState('');
  const [order, setOrder] = useState('');
  const [color, setColor] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  useEffect(() => {
    if (tags) {
      setOrder(Object.keys(tags).length + 1);
    }
  }, [tags]);

  let pastels = ['#d68562', '#1eafc7', '#bb942d', '#3aa595', '#a3a09a', '#c9c1a0', '#b54d4d', '#6cc5b5', '#b878d3', '#e01d5f', '#d5c96d', '#f864af', '#5ca778', '#8b5f99', '#0e76a9', '#a4265b', '#4c1d3d', '#0c978d', '#c87815', '#ae6c29'];
  useEffect(() => {
    setColor(() => {
      tags &&
        tags.forEach((tag) => {
          pastels = pastels.filter((p) => p !== tag.color);
        });

      const rndPastelIndex = Math.floor(Math.random() * pastels.length);
      const rndPastel = pastels[rndPastelIndex];
      return rndPastel;
    });
  }, [tags]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tag = { title, order, color };

    const response = await fetch('/api/tags', {
      method: 'POST',
      body: JSON.stringify(tag),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      setTitle('');
      setOrder('');
      setColor('');
      dispatchTags({ type: 'CREATE_TAG', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Tag</h3>

      <label>Title:</label>
      <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className={emptyFields.includes('title') ? 'error' : ''} />

      <button>Add Tag</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TagForm;
