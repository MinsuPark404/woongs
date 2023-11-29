import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import documents from "../views/documents";
import actionTypes from "../constants/actionTypes";



export const sendHtmlToServer = (html) => ({
  type: actionTypes.SEND_HTML_TO_SERVER,
  html
});
export const fetchHtmlFromServer = () => ({
  type: actionTypes.FETCH_HTML_FROM_SERVER,
  
});

class Output extends Component {
  constructor(props) {
    super(props);
  }
  handleSend = () => {
    
    this.props.sendHtmlToServer(this.props.html);
  };
  handleFetch = () => {
    this.props.fetchHtmlFromServer();
  };

  render() {
    if (!this.props.display) return null;

    return (
      <div>
        <div className='d-flex justify-content-between align-items-center'>
          <h5>Export</h5>
        </div>
        <hr />
        <div>
          <label>Output HTML</label>
          <textarea readOnly className='form-control' rows={10} value={this.props.html}></textarea>
          <button onClick={this.handleSend}>Send to Server</button>
          <button onClick={this.handleFetch}>Fetch from Server</button>
        </div>
      </div>
    );
  }
}

Output.propTypes = {
  display: PropTypes.bool,
  html: PropTypes.string,
  sendHtmlToServer: PropTypes.func.isRequired,
  fetchHtmlFromServer: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  sendHtmlToServer,
  fetchHtmlFromServer,
};

const mapStateToProps = (state) => {
  return {
    html: state.html // 'state.html'은 Redux store의 해당 상태를 참조해야 합니다.
  };
};
export default connect(null, mapDispatchToProps)(Output);
