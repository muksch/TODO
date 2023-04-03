import { useEffect } from 'react';
import { useProjectsContext } from '../hooks/useProjectsContext';
import ProjectDetail from './ProjectDetail';

const ProjectList = () => {
  const { projects, dispatchProjects } = useProjectsContext();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects');
      const json = await response.json();

      if (response.ok) {
        dispatchProjects({ type: 'SET_PROJECTS', payload: json });
      }
    };

    fetchProjects();
  }, [dispatchProjects]);

  return (
    <div className="project-list">
      <h2>My projects</h2>
      {projects && projects.map((project) => <ProjectDetail project={project} key={project._id} />)}
    </div>
  );
};

export default ProjectList;
