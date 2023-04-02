import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TagsContextProvider } from './context/TagsContext';
import { ProjectsContextProvider } from './context/ProjectsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TagsContextProvider>
      <ProjectsContextProvider>
        <App />
      </ProjectsContextProvider>
    </TagsContextProvider>
  </React.StrictMode>
);
