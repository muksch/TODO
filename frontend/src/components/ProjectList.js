import { Link } from 'react-router-dom';
import { useProjectsContext } from '../hooks/useProjectsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const ProjectList = () => {
  const { projects, dispatchProjects } = useProjectsContext();
  const { user } = useAuthContext();
  const removeProjectHandle = async (project) => {
    const response = await fetch(`api/projects/${project._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Baerer ${user.token}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      dispatchProjects({ type: 'DELETE_PROJECT', payload: json });
    }
  };
  const openNewProjectHandle = () => {
    const createProject = document.querySelector('.create-project');
    const pages = document.querySelector('.page');
    createProject.classList.toggle('show');
    pages.classList.toggle('blurred');
  };

  return (
    <div className="project-list-wrap">
      <div className="projects-header">
        <h2>My projects</h2>
        <button id="new-project" onClick={() => openNewProjectHandle()}>
          <p>Add new project </p>
          <span className="material-icons plus">add</span>
        </button>
      </div>
      <div className="project-list">
        {projects &&
          projects.map((project) => (
            <div className="project" key={project._id}>
              <Link to={`/project/${project._id}`}>
                <div className="project-details">
                  <div className="overlay"></div>
                  <h3>{project.projectTitle}</h3>
                  {/* <p className="project-description">{project.projectDescription}</p> */}
                  <div className="project-tags tags">
                    {project.projectTags && project.projectTags.length > 0 ? (
                      project.projectTags.map((projectTag) => (
                        <div className="tag-details" style={{ background: projectTag.color }} key={projectTag._id}>
                          <h4>{projectTag.title}</h4>
                        </div>
                      ))
                    ) : (
                      <p>No tags yet!</p>
                    )}
                  </div>
                </div>
              </Link>
              <span onClick={() => removeProjectHandle(project)} className="material-icons remove-project-button">
                close
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectList;
