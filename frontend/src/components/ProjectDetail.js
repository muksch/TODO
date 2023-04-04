import { useProjectsContext } from '../hooks/useProjectsContext';

const ProjectDetail = ({ project }) => {
  const { dispatchProjects } = useProjectsContext();
  const removeProjectHandle = async (e) => {
    const response = await fetch(`api/projects/${project._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const json = await response.json();
      dispatchProjects({ type: 'DELETE_PROJECT', payload: json });
    }
  };

  const removeTagHandle = async (id) => {
    const updatedTags = project.projectTags.filter((t) => t._id !== id);
    const response = await fetch(`api/projects/${project._id}`, {
      method: 'PATCH',
      body: {
        projectTags: updatedTags,
      },
    });

    if (response.ok) {
      const json = await response.json();
      dispatchProjects({ type: 'UPDATE_PROJECT', payload: json });
    }
  };

  return (
    <div className="project-details">
      {console.log('render')}
      <h4>{project.projectTitle}</h4>
      <p className="project-description">{project.projectDescription}</p>
      <div className="project-tags tags">
        {project.projectTags &&
          project.projectTags.map((projectTag) => (
            <div className="tag-details" style={{ background: projectTag.color }} key={projectTag._id}>
              <h4>{projectTag.title}</h4>
              <span onClick={() => removeTagHandle(projectTag._id)} className="material-icons">
                close
              </span>
            </div>
          ))}
      </div>
      <span onClick={removeProjectHandle} className="material-icons">
        close
      </span>
    </div>
  );
};

export default ProjectDetail;
