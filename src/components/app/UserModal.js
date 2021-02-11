import React, { Component } from 'react';
import axios from 'axios';
import { Avatar, Row, Col, Divider, Modal, Table } from 'antd';
import Loading from '../common/Loading';

// User modal component.
// Shows the user's basic information and their repositories.
class UserModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      loading : true,
      user : null,
      userRepos : [],
    };
  }

  loadUserRepos(url){
    axios.get(url).then(res => {
      this.setState({ 
        userRepos: res.data,
        loading: false,
      });
    });
  };

  loadUser(url){
    if (url === "") {
      return;
    }
    axios.get(url).then(res => {
      this.setState({
          user: res.data,
        }, () => this.loadUserRepos(this.state.user.repos_url)
      )
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.userUrl !== this.props.userUrl) {
      this.setState({ loading : true });
      this.loadUser(this.props.userUrl);
    }
  }
  
  render(){
    if (this.state.loading) {
      return (
        <Modal title="User Information" visible={this.props.isModalVisible} 
          onCancel={this.props.hideModal} width={700} footer={null}>
          <Loading/>
        </Modal>
      );
    }

    const columns = [
      {
        title: 'Repositories',
        dataIndex: 'repo',
        key: 'repo',
        render: repo => (
        <a href={repo.html_url} target="_blank">
            <h4> {repo.name} </h4>
            <p> {repo.description} </p>
        </a>
        ),
      },
    ];
    const display_data = this.state.userRepos.map(repo => (
      { repo : repo }
    ));
    return (
      <Modal title="User Information" visible={this.props.isModalVisible} 
        onCancel={this.props.hideModal} width={700} footer={null}>
        <div className="centered-container">
          <Row gutter={20}>
            <Col span={8}>
              <div className="user-info-container">
                <a href={this.state.user.html_url} target="_blank">
                  <div className="user-avatar">
                    <Avatar src={this.state.user.avatar_url} size={80} ></Avatar>
                  </div>
                  <h3>{this.state.user.name}</h3>
                  <p>{this.state.user.login}</p>
                </a>
                <Divider />
                <div>
                  <p>{this.state.user.email}</p>
                  <p>
                    Public Repositories: {this.state.user.public_repos}<br/>
                    Public Gists: {this.state.user.public_gists}
                  </p>
                </div>
              </div>
            </Col>
            <Col span={16}>
              <Table columns={columns} dataSource={display_data} size="small" scroll={{ y: 250 }}/>
            </Col>
          </Row>
        </div>
      </Modal>
    );
  }
}

export default UserModal;
