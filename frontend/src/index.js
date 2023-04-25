import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TagsContextProvider } from './context/TagsContext';
import { ProjectsContextProvider } from './context/ProjectsContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TagsContextProvider>
        <ProjectsContextProvider>
          <App />
        </ProjectsContextProvider>
      </TagsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
