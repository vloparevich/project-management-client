import React, { Component } from 'react';
import axios from 'axios';

class EditProject extends Component {
  state = {
    title: this.props.project.title,
    description: this.props.project.description,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;

    axios
      .put(`http://localhost:5000/api/projects/${this.props.project._id}`, {
        title,
        description,
      })
      .then(() => {
        this.props.getTheProject();
      })
      .catch((err) => console.log(err));
  };

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  handleChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render = () => {
    return (
      <div>
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type='text'
            name='title'
            value={this.state.title}
            onChange={(e) => this.handleChangeTitle(e)}
          />
          <label>Description:</label>
          <textarea
            name='description'
            value={this.state.description}
            onChange={(e) => this.handleChangeDescription(e)}
          />

          <input type='submit' value='Submit' />
        </form>
      </div>
    );
  };
}

export default EditProject;
