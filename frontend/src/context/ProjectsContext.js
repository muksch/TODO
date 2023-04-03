import { createContext, useReducer } from 'react';

export const ProjectsContext = createContext();

export const projectsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return {
        projects: action.payload,
      };
    case 'CREATE_PROJECT':
      return {
        projects: [...state.projects, action.payload],
      };
    case 'UPDATE_PROJECTS':
      return {
        projects: action.payload,
      };
    case 'DELETE_PROJECT':
      return {
        projects: state.projects.filter((t) => t._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const ProjectsContextProvider = ({ children }) => {
  const [state, dispatchProjects] = useReducer(projectsReducer, {
    projects: null,
  });

  return <ProjectsContext.Provider value={{ ...state, dispatchProjects }}>{children}</ProjectsContext.Provider>;
};
