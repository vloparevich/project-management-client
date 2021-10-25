import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import EditProject from '../projects/EditProject';
import AddTask from '../tasks/AddTask';

export default class ProjectDetails extends Component {
  state = {};

  componentDidMount = () => {
    console.log('mounting');
    this.getSingleProject();
  };

  getSingleProject = () => {
    const { params } = this.props.match;
    console.log('my params', this.props);
    axios
      .get(`http://localhost:5000/api/projects/${params.id}`)
      .then((responseFromApi) => {
        const project = responseFromApi.data;
        this.setState(project);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    console.log('my state', this.state.title);
    if (this.state.title) {
      return (
        <EditProject
          project={this.state}
          getTheProject={this.getSingleProject}
        />
      );
    }
  };

  // DELETE PROJECT:
  deleteProject = () => {
    const { params } = this.props.match;
    axios
      .delete(`http://localhost:5000/api/projects/${params.id}`)
      .then(() => {
        this.props.history.push('/projects'); // !!!
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderAddtaskForm = () => {
    if (!this.state.title) {
      this.getSingleProject();
    } else {
      return (
        <AddTask project={this.state} getTheProject={this.getSingleProject} />
      );
    }
  };

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>

        {this.state.tasks && this.state.tasks.lrngth > 0 && <h3>Tasks</h3>}
        {this.state.tasks &&
          this.state.tasks.map((task, index) => {
            return (
              <div key={index}>
                <Link to={`/projects/${this.state._id}/tasks/${task._id}`}>
                  {task.title}
                </Link>
              </div>
            );
          })}

        <div>{this.renderEditForm()}</div>
        <button onClick={() => this.deleteProject()}>Delete Project</button>
        <Link to={'/projects'}>Back to the projects</Link>
      </div>
    );
  }
}
