import Tags from '../components/Tags';
import Projects from '../components/Projects';
import ProjectForm from '../components/ProjectForm';

const Dashboard = () => {
  return (
    <>
      <div className="page">
        <Tags />
        <Projects />
      </div>
      <ProjectForm />
    </>
  );
};

export default Dashboard;
