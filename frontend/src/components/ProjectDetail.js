import { useProjectsContext } from '../hooks/useProjectsContext';
import ProjectTags from './ProjectTags';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const ProjectDetailContent = ({ filteredProject }) => {
  const { user } = useAuthContext();
  const { dispatchProjects } = useProjectsContext();
  const removeProjectHandle = async (e) => {
    const response = await fetch(`api/projects/${filteredProject._id}`, {
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

  return (
    <div className="project-details">
      <h4>{filteredProject.projectTitle}</h4>
      <p className="project-description">{filteredProject.projectDescription}</p>
      <div className="project-tags tags">
        <ProjectTags project={filteredProject} key={filteredProject._id} />
      </div>
      <span onClick={removeProjectHandle} className="material-icons">
        close
      </span>
    </div>
  );
};

const ProjectDetail = ({ project }) => {
  const { projects } = useProjectsContext();
  const { projectId } = useParams();

  const getProject = (id, projectsArr) => {
    let project;
    projectsArr ? (project = projectsArr.filter((p) => p._id === id)) : (project = []);
    return project[0];
  };

  const filteredProject = getProject(projectId, projects);

  return filteredProject ? <ProjectDetailContent filteredProject={filteredProject} key={filteredProject._id} /> : <div className="error-message">No such a project</div>;
};

export default ProjectDetail;
