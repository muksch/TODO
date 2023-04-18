import { useProjectsContext } from '../hooks/useProjectsContext';

const ProjectTagDetail = (project, projectTag) => {
  const { dispatchProjects } = useProjectsContext;
  const removeTagHandle = async (id) => {
    project.projectTags = project.projectTags.filter((t) => t._id !== id);
    const response = await fetch(`api/projects/${project._id}`, {
      method: 'PATCH',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const json = await response.json();
      dispatchProjects({ type: 'UPDATE_PROJECT', payload: json });
    }
  };
  return (
    <div className="project-tag-detail">
      <div className="tag-details" style={{ background: projectTag.color }} key={projectTag._id}>
        <h4>{projectTag.title}</h4>
        <span onClick={() => removeTagHandle(projectTag._id)} className="material-icons">
          close
        </span>
      </div>
    </div>
  );
};

export default ProjectTagDetail;
