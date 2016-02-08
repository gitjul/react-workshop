import React from 'react';
import Menu from './Menu';
import MenuButtonNames from '../../lib/MenuButtonNames';
import BasicInfo from '../enroll/BasicInfo';
import Preferences from '../enroll/Preferences';
import API from '../../lib/API';
import history from '../../history.js';

class StudentForm extends React.Component {
  constructor(props) {
    super(props);
  }

  value() {
    const id = { id: this.props.student.id }
    return Object.assign({}, id, this.refs.basic.value(), this.refs.preferences.value())
  }

  render() {
    return (
      <div>
        <Menu activeButton={MenuButtonNames.ENROLL} />
        <form>
          <BasicInfo student={this.props.student} ref="basic" errors={this.props.errors} />
          <Preferences student={this.props.student} ref="preferences" errors={this.props.errors} />
          <div className="action-holder">
            <input type="submit" value="Save" onClick={this.props.handleSubmit.bind(this)} />
          </div>
        </form>
      </div>
    )
  }
}

export default StudentForm;
