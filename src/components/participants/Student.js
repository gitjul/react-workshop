import React from 'react';
import { Link } from 'react-router';

class Student extends React.Component {
  studentName() {
    const { name, surname } = this.props.data;
    return `${name} ${surname}`;
  }

  render() {
    const { id, house, pet } = this.props.data;

    return (
      <li className="student-item">
        <h2>{this.studentName()}</h2>
        <p>
          <strong> House: </strong>
          {house}
        </p>
        <p>
          <strong> Pet Companion: </strong>
          {pet}
        </p>
        <p>
          <Link to={`/edit/${id}`} >Edit</Link>
        </p>
      </li>
    )
  }
}

Student.PropTypes = {
  data: React.PropTypes.object.isRequired
}

export default Student;
