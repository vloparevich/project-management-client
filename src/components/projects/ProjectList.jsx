import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddProject from './AddProject';

export default class ProjectList extends Component {
  state = {
    listOfProjects: [],
  };

  getAllProjects = () => {
    axios.get(`http://localhost:5000/api/projects`).then((responseFromApi) => {
      console.log('front end', responseFromApi);
      this.setState({ listOfProjects: responseFromApi.data });
    });
  };

  componentDidMount = () => {
    this.getAllProjects();
  };

  render() {
    return (
      <div>
        <div style={{ width: '60%', float: 'left' }}>
          {this.state.listOfProjects.map((project) => {
            return (
              <div key={project._id}>
                <Link to={`/projects/${project._id}`}>
                  <h3>{project.title}</h3>
                </Link>
                {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
                <ul>
                  {project.tasks.map((task, index, array) => {
                    return <li key={index}>{task.title}</li>;
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        <div style={{ width: '40%', float: 'right' }}>
          <AddProject getData={() => this.getAllProjects()} /> {/* <== !!! */}
        </div>
      </div>
    );
  }
}
