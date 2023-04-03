// components
import TagList from '../components/TagList';
import TagForm from '../components/TagForm';
import ProjectList from '../components/ProjectList';

const Home = () => {
  return (
    <div className="home">
      <TagList />
      <TagForm />
      <div className="projects">
        <ProjectList />
      </div>
    </div>
  );
};

export default Home;
