import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

// pages & components
import Home from './pages/Home';
import Header from './components/Header';
import Project from './pages/Project';
import { useProjectsContext } from './hooks/useProjectsContext';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  // Get projects
  const { user } = useAuthContext();
  const { dispatchProjects } = useProjectsContext();

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch('/api/projects', {
        headers: {
          Authorization: `Baerer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatchProjects({ type: 'SET_PROJECTS', payload: json });
      }
    };

    if (user) {
      fetchProjects();
    }
  }, [dispatchProjects, user]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/project/:projectId" element={user ? <Project /> : <Navigate to="/login" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
