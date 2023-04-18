import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// pages & components
import Home from './pages/Home';
import Header from './components/Header';
import Project from './pages/Project';
import { useProjectsContext } from './hooks/useProjectsContext';
import Dashboard from './pages/Dashboard';

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
            <Route path="/project/:projectId" element={<Project />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
