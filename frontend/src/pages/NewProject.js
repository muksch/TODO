// components
import TagList from '../components/TagList';
import TagForm from '../components/TagForm';
import ProjectForm from '../components/ProjectForm';

const NewProject = () => {
  return (
    <div className="new-project">
      <TagList />
      <TagForm />
      <div className="projects">
        <ProjectForm />
      </div>
    </div>
  );
};

export default NewProject;
