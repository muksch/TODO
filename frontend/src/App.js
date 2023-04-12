import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// pages & components
import Home from './pages/Home';
import NewProject from './pages/NewProject';
import Header from './components/Header';
import ProjectDetailPage from './pages/ProjectDetailPage';
import { useProjectsContext } from './hooks/useProjectsContext';

function App() {
  // Get projects
  const { dispatchProjects } = useProjectsContext();
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects');
      const json = await response.json();

      if (response.ok) {
        dispatchProjects({ type: 'SET_PROJECTS', payload: json });
      }
    };

    fetchProjects();
  }, [dispatchProjects]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/project/:projectId" element={<ProjectDetailPage />} />
            <Route path="/new-project" element={<NewProject />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
