import { useEffect, useState } from 'react';
import { useProjectsContext } from '../hooks/useProjectsContext';
import { useTagsContext } from '../hooks/useTagsContext';

const ProjectForm = () => {
  const { tags } = useTagsContext();
  const { dispatchProjects } = useProjectsContext();

  //   [
  //     {
  //       "title": "HP",
  //       "color": "#111"
  //       "order": 1
  //   }
  // ]

  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectTags, setProjectTags] = useState([]);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const projectSaveHandle = async (e) => {
    e.preventDefault();

    const project = { projectTitle, projectDescription, projectTags };
    console.log(project);

    const response = await fetch('/api/projects', {
      method: 'POST',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json',
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
      setProjectTags([]);
      dispatchProjects({ type: 'CREATE_PROJECT', payload: json });
    }
  };

  return (
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
      <label>Tags:</label>
      <br />
      <textarea onChange={(e) => setProjectTags(e.target.value)} value={projectTags} className={emptyFields.includes('tags') ? 'error' : ''} />

      <button>Add Tag</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default ProjectForm;
