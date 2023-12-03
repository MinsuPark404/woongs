import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import documents from "../views/documents";
import actionTypes from "../constants/actionTypes";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

export const sendHtmlToServer = (html) => ({
  type: actionTypes.SEND_HTML_TO_SERVER,
  html
});



class Output extends Component {
  constructor(props) {
    super(props);
    
  }
  handleSend = () => {
    
    this.props.sendHtmlToServer(this.props.html);
  };
  
  state = {
    open: false,
    search: '',
    selectedItem: null,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.handleSend();
    this.setState({ open: false });
  };

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  };
  
  handleItemClick = (item) => {
    this.setState({ selectedItem: item });
    alert(`${item}이(가) 선택되었습니다.`);
  };
  

  render() {
    if (!this.props.display) return null;
    const { open, search, selectedItem } = this.state;
    const { display, html } = this.props;
    const listData = [
      'http://example58267.com',
      'http://example86700.com',
      'http://example58939.com',
      'http://example90600.com',
      'http://example42473.com',
      'http://example18024.com',
      'http://example98354.com',
      'http://example53676.com',
      'http://example49004.com',
      'http://example21607.com',
      'http://woonngkinder.com',
    ];
    const filteredListData = listData.filter(item =>
      item.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <div>
        <div className='d-flex justify-content-between align-items-center'>
          <h5>Export</h5>
        </div>
        <hr />
        <div>
          <label>Output HTML</label>
          <textarea readOnly className='form-control' rows={10} value={this.props.html}></textarea>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '30px'
          }}>
          {/* <Button onClick={this.handleSend} size="large" variant="contained" sx={{margin : '20px'}}>배포하기</Button>
          <Button onClick={this.fetchData} size="large" variant="contained" sx={{margin : '20px'}}>가져오기</Button> */}
          <Button size="large" variant="contained" sx={{margin : '20px'}} onClick={this.handleOpen}>배포하기</Button>
          <Button onClick={this.fetchData} size="large" variant="contained" sx={{margin : '20px'}}>가져오기</Button>
          </div>
          <div className='preview'>
          
        </div>
        </div>
        <Dialog open={open} onClose={this.handleClose} maxWidth="sm" fullWidth="true">
          <DialogTitle>도메인 선택</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="검색"
              type="search"
              fullWidth
              variant="standard"
              value={search}
              onChange={this.handleSearchChange}
            />
            <List>
              {filteredListData.map((item, index) => (
                <ListItem 
                key={index}
                button
                selected={selectedItem === item} // 추가: 선택된 아이템 표시
                onClick={() => this.handleItemClick(item)} // 추가: 클릭 이벤트 핸들러
                sx={ {
                  textAlign: 'center',
                }}
                >{item}
                </ListItem>
              ))}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>확인</Button>
          </DialogActions>
        </Dialog>
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
  
};

export default connect(null, mapDispatchToProps)(Output);
