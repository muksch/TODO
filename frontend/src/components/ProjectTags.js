import ProjectTagDetail from './ProjectTagDetail';

const ProjectTags = ({ project }) => {
  return <div className="project-tags">{project.projectTags && project.projectTags.map((projectTag) => <ProjectTagDetail project={project} projectTag={projectTag} key={projectTag._id} />)}</div>;
};

export default ProjectTags;
