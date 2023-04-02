import { useProjectContext } from '../hooks/useProjectContext';

const ProjectDetail = ({ project }) => {
  const { project, dispatch } = useTagsContext();

  const handleClick = async (e) => {
    const response = await fetch(`api/projects/${project._id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const json = await response.json();
      dispatch({ type: 'DELETE_PROJECT', payload: json });
    }
  };

  return (
    <div className="project-details">
      <h4>{project.title}</h4>
      <p className="project-description">{project.description}</p>
      <div className="project-tags">
        {project.tags &&
          project.tags.map((tag) => {
            <div className="tag-details" style={{ background: tag.color }}>
              <h4>{tag.title}</h4>
              <span onClick={removeTagHandle} className="material-icons">
                close
              </span>
            </div>;
          })}
      </div>
      <span onClick={removeProjectHandle} className="material-icons">
        close
      </span>
    </div>
  );
};

export default ProjectDetail;
