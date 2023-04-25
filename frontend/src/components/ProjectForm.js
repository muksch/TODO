import { useState } from 'react';
import { useProjectsContext } from '../hooks/useProjectsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const ProjectForm = () => {
  const { dispatchProjects } = useProjectsContext();
  const { user } = useAuthContext();

  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const projectSaveHandle = async (e) => {
    e.preventDefault();

    const project = { projectTitle, projectDescription };

    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Baerer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      setProjectTitle('');
      setProjectDescription('');
      console.log(`json: ${json}`);
      dispatchProjects({ type: 'CREATE_PROJECT', payload: json });
    }
  };

  return (
    <>
      {user && (
        <form className="create" onSubmit={projectSaveHandle}>
          <h3>Add a New Project</h3>

          <label>Title:</label>
          <br />
          <input type="text" onChange={(e) => setProjectTitle(e.target.value)} value={projectTitle} className={emptyFields.includes('title') ? 'error' : ''} />
          <br />
          <label>Description:</label>
          <br />
          <textarea onChange={(e) => setProjectDescription(e.target.value)} value={projectDescription} className={emptyFields.includes('description') ? 'error' : ''} />
          <br />
          <button>Add Project</button>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </>
  );
};

export default ProjectForm;
