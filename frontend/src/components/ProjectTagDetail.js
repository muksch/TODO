import { useProjectsContext } from '../hooks/useProjectsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const ProjectTagDetail = ({ project, projectTag }) => {
  const { dispatchProjects } = useProjectsContext();
  const { user } = useAuthContext();
  const removeTagHandle = async (id) => {
    project.projectTags = project.projectTags.filter((t) => t._id !== id);
    const response = await fetch(`/api/projects/${project._id}`, {
      method: 'PATCH',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Baerer ${user.token}`,
      },
    });

    if (response.ok) {
      const json = await response.json();
      dispatchProjects({ type: 'UPDATE_PROJECT', payload: json });
    }
  };
  return (
    <div className="project-tag-detail">
      <div className="tag-details" style={{ background: projectTag.color }}>
        <h4>{projectTag.title}</h4>
        <span onClick={() => removeTagHandle(projectTag._id)} className="material-icons">
          close
        </span>
      </div>
    </div>
  );
};

export default ProjectTagDetail;
