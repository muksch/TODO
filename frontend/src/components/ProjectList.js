import { useProjectsContext } from '../hooks/useProjectsContext';
import ProjectDetail from './ProjectDetail';

const ProjectList = () => {
  const { projects } = useProjectsContext();

  return (
    <div className="project-list">
      <h2>My projects</h2>
      {projects && projects.map((project) => <ProjectDetail project={project} key={project._id} />)}
    </div>
  );
};

export default ProjectList;
