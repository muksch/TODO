// components
import TagList from '../components/TagList';
import TagForm from '../components/TagForm';
import ProjectDetail from '../components/ProjectDetail';
import { useProjectsContext } from '../hooks/useProjectsContext';
import { useParams } from 'react-router-dom';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const { projects } = useProjectsContext();

  const getProject = (id, projectsArr) => {
    let project;
    projectsArr ? (project = projectsArr.filter((p) => p._id === id)) : (project = []);
    return project[0];
  };

  const filteredProject = getProject(projectId, projects);

  return (
    <div className="home">
      <TagList />
      <TagForm />
      <div className="projects">{filteredProject ? <ProjectDetail project={filteredProject} key={filteredProject._id} /> : <div className="error-message">No such a project</div>}</div>
    </div>
  );
};

export default ProjectDetailPage;
