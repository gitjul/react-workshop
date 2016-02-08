import React from 'react';
import Menu from '../components/shared/Menu';
import MenuButtonNames from '../lib/MenuButtonNames';
import BasicInfo from '../components/enroll/BasicInfo';
import Preferences from '../components/enroll/Preferences';
import API from '../lib/API';
import history from '../history.js';
import StudentForm from '../components/shared/StudentForm.js';

class Enroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null,
      student: {
        house: "",
        pet: ""
      }
    }
  }

  setErrors(errors) {
    this.setState({errors: errors})
  }

  redirectToList() {
    return history.pushState(null, "/participants");
  }

  handleSubmit(e) {
    e.preventDefault();
    const student = Object.assign({}, this.refs.student.value())
    const result = new API().addStudent(student.name, student.surname, student.house, student.pet)
    if(result["errors"]) {
      this.setErrors(result.errors);
    } else {
      this.redirectToList();
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <StudentForm student={this.state.student} errors={errors} handleSubmit={this.handleSubmit.bind(this)} ref="student" />
    )
  }
}

export default Enroll;
