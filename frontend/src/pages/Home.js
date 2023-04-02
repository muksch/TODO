import { useEffect } from 'react';
import { useTagsContext } from '../hooks/useTagsContext';

// components
import TagList from '../components/TagList';
import TagForm from '../components/TagForm';
import ProjectList from '../components/ProjectList';

const Home = () => {
  const { tags, dispatch } = useTagsContext();

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch('/api/tags');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_TAGS', payload: json });
      }
    };

    fetchTags();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="tags">
        {tags && tags.map((tag) => <TagList tag={tag} key={tag._id} />)}
        <TagForm />
      </div>
      <div className="projects">
        <ProjectList />
      </div>
    </div>
  );
};

export default Home;
