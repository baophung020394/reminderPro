import React, { Component } from "react";
import { connect } from "react-redux";
import { addReminder, deleteReminder, clearReminder } from "../actions";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      dueDate: ""
    };
  }

  addReminder() {
    // console.log(this.state);
    this.props.addReminder(this.state.text, this.state.dueDate);
  }
  clearReminder() {
    this.props.clearReminder();
  }
  renderReminder() {
    const { reminders } = this.props;

    return (
      <ul className="list-group col-sm-4">
        {reminders.map(reminder => {
          return (
            <li key={reminder.id} className="list-group-item">
              <div className="list-item">
                <div>{reminder.text}</div>
                <div>{moment(new Date(reminder.dueDate)).fromNow()}</div>
              </div>
              <div
                className="list-item delete-button"
                onClick={() => this.deleteReminder(reminder.id)}
              >
                &#x2715;
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }
  displayButtonRemoveAll() {
    const { reminders } = this.props;
    if (reminders.length > 0) {
      return (
        <div className="btn btn-danger" onClick={() => this.clearReminder()}>
          Remove All
        </div>
      );
    } else {
      return null;
    }
  }
  render() {
    return (
      <div className="App">
        <div className="title">Reminder Pro</div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              onChange={event => this.setState({ text: event.target.value })}
              className="form-control"
              placeholder="I have to..."
            />
            <input
              className="form-control"
              type="datetime-local"
              onChange={event => this.setState({ dueDate: event.target.value })}
            />
          </div>

          <button
            onClick={() => this.addReminder()}
            type="submit"
            className="btn btn-success"
          >
            Add Reminder
          </button>
        </div>
        {this.renderReminder()}
        {this.displayButtonRemoveAll()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  };
}

export default connect(
  mapStateToProps,
  { addReminder, deleteReminder, clearReminder }
)(App);
