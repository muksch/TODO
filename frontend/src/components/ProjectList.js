import { Link } from 'react-router-dom';
import { useProjectsContext } from '../hooks/useProjectsContext';

const ProjectList = () => {
  const { projects, dispatchProjects } = useProjectsContext();
  const removeProjectHandle = async (project) => {
    const response = await fetch(`api/projects/${project._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const json = await response.json();
      dispatchProjects({ type: 'DELETE_PROJECT', payload: json });
    }
  };

  return (
    <div className="project-list">
      <h2>My projects</h2>
      {projects &&
        projects.map((project) => (
          <Link to={`/project/${project._id}`} key={project._id}>
            <div className="project-details">
              <h4>{project.projectTitle}</h4>
              <p className="project-description">{project.projectDescription}</p>
              <div className="project-tags tags">
                {project.projectTags &&
                  project.projectTags.map((projectTag) => (
                    <div className="tag-details" style={{ background: projectTag.color }} key={projectTag._id}>
                      <h4>{projectTag.title}</h4>
                    </div>
                  ))}
              </div>
              <span onClick={() => removeProjectHandle(project)} className="material-icons">
                close
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default ProjectList;
