import { useProjectsContext } from '../hooks/useProjectsContext';
import { useTagsContext } from '../hooks/useTagsContext';
import { useParams } from 'react-router-dom';

const TagDetail = ({ tag }) => {
  const { tags, dispatchTags } = useTagsContext();
  const { projects, dispatchProjects } = useProjectsContext();
  const { projectId } = useParams();

  const handleDelete = async (e) => {
    const updatedTags = tags.filter((t) => t._id !== tag._id).map((t, i) => ({ ...t, order: i + 1 }));
    const response = await fetch('api/tags/' + tag._id, {
      method: 'DELETE',
    });

    if (response.ok) {
      const updateResponse = await fetch('api/tags/updateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTags),
      });
      if (updateResponse.ok) {
        const json = await updateResponse.json();
        dispatchTags({ type: 'UPDATE_TAGS', payload: json });
      }
    }
  };

  const assignTagHandle = async () => {
    // console.log(projects[0]);
    const getProject = (id, projectsArr) => {
      let project;
      projectsArr ? (project = projectsArr.filter((p) => p._id === id)) : (project = []);
      return project[0];
    };
    const filteredProject = getProject(projectId, projects);

    const newTag = {
      title: tag.title,
      color: tag.color,
    };

    filteredProject.projectTags.push(newTag);

    const response = await fetch(`/api/projects/${filteredProject._id}`, {
      method: 'PATCH',
      body: JSON.stringify(filteredProject),
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
    <div className="tag-details" style={{ background: tag.color }}>
      {projectId && <h4 onClick={assignTagHandle}>{tag.title}</h4>}
      {!projectId && <h4>{tag.title}</h4>}
      <span onClick={handleDelete} className="material-icons">
        close
      </span>
    </div>
  );
};

export default TagDetail;
