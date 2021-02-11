import React, { Component } from 'react';
import { Avatar, Row, Col, Divider} from 'antd';
import UserModal from './UserModal';

// Commit user information component of a commit page.
class CommitUser extends Component {

  constructor(props){
    super(props);
    this.state = {
      userUrl : "",
      isModalVisible : false,
    };
  }
  
  showModal(url){
    this.setState({
      userUrl: url,
      isModalVisible: true,
    })
  };
  
  hideModal = () => {
    this.setState({
      isModalVisible: false,
    })
  };

  render() {
    return (
      <>
      <Row>
        <Col span={24}>
          <div className="commit-component">
            <div className="inline-container" onClick={() => this.showModal(this.props.commit.author.url)}>
              <Avatar src={this.props.commit.author.avatar_url} size={40} ></Avatar>
            </div>
            <div className="inline-container">
              <h4>{this.props.commit.author.login}</h4>
            </div>
            <div className="inline-container">
              <p> commited on {this.props.commit.commit.author.date}</p>
            </div>
            <Divider type="vertical"></Divider>
            <div className="inline-container">
              <p>parents</p>
            </div>
            {this.props.commit.parents.map(parent => 
            {
              return (
              <div className="inline-container">
                <p>{parent.sha.substring(0,7)}</p>
              </div>
              );
            })}            
          <Divider/>
          </div>
        </Col>
      </Row>
      <UserModal userUrl={this.state.userUrl} isModalVisible={this.state.isModalVisible}
       hideModal={this.hideModal}/>
      </>
    );
  }
}

export default CommitUser;
