import logo from './logo.svg';
import './App.css';
import AddProject from './components/projects/AddProject';
import ProjectList from './components/projects/ProjectList';
import Navbar from './components/navbar/Navbar';
import { Switch, Route } from 'react-router-dom';
import ProjectDetails from './components/projects/ProjectDetails';
import TaskDetails from './components/tasks/TaskDetail';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route exact path='/projects' component={ProjectList} />
        <Route exact path='/projects/:id' component={ProjectDetails} />
        <Route
          exact
          path='/projects/:id/tasks/:taskId'
          component={TaskDetails}
        />
      </Switch>
    </div>
  );
}

export default App;
