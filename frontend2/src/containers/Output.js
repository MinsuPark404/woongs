import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import documents from "../views/documents";
import actionTypes from "../constants/actionTypes";
import axios from 'axios'


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
    this.state = {
      data: null, // 초기 상태에서는 데이터가 없음
    };
  }
  handleSend = () => {
    
    this.props.sendHtmlToServer(this.props.html);
  };
  
  fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000');
      this.setState({ data: response.data[0].url_html });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  
  componentDidMount() {
    this.fetchData();
  }
  handleFetch = () => {
    this.fetchData();
  };
  

  render() {
    if (!this.props.display) return null;
    const { data } = this.state;
    
    return (
      <div>
        <div className='d-flex justify-content-between align-items-center'>
          <h5>Export</h5>
        </div>
        <hr />
        <div>
          <label>Output HTML</label>
          <textarea readOnly className='form-control' rows={10} value={this.props.html}></textarea>
          <textarea readOnly className='form-control' rows={10} value={data}></textarea>
          <button onClick={this.handleSend}>Send to Server</button>
          <button onClick={this.fetchData}>Fetch from Server</button>
        </div>
      </div>
    );
  }
}

Output.propTypes = {
  display: PropTypes.bool,
  html: PropTypes.string,

};
const mapDispatchToProps = {
  sendHtmlToServer,
  fetchHtmlFromServer,
};

export default connect(null, mapDispatchToProps)(Output);
