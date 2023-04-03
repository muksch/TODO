import { createContext, useReducer } from 'react';

export const TagsContext = createContext();

export const tagsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TAGS':
      return {
        tags: action.payload,
      };
    case 'CREATE_TAG':
      return {
        tags: [...state.tags, action.payload],
      };
    case 'UPDATE_TAGS':
      return {
        tags: action.payload,
      };
    case 'DELETE_TAG':
      return {
        tags: state.tags.filter((t) => t._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const TagsContextProvider = ({ children }) => {
  const [state, dispatchTags] = useReducer(tagsReducer, {
    tags: null,
  });

  return <TagsContext.Provider value={{ ...state, dispatchTags }}>{children}</TagsContext.Provider>;
};
