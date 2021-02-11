import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Avatar, Table, Pagination } from 'antd';
import UserModal from './UserModal';
import Loading from '../common/Loading';

const commitsPerPage = 10;
const commitsUrl = `https://api.github.com/repos/facebook/react/commits`;

// Table of commits component of the main page.
class CommitsTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      commits : null,
      userUrl : "",
      isModalVisible : false,
      loading : true,
      page : 1,
    };
  }

  componentDidMount() {
    this.loadCommits();
  };
  
  loadCommits(){
    axios.get(commitsUrl, {
      params: {
        per_page: commitsPerPage,
        page: this.state.page,
      },
    }).then(res => {
      this.setState({ 
        commits: res.data,
        loading: false,
      });
    });    
  };
  
  // Controls visibility of user modal.
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

  // Controls table pagination.
  onChange = page => {
    this.setState({
      page: page,
    }, () => this.loadCommits());
  };
  
  render() {
    if (this.state.loading) {
      return <Loading/>
    }
    const columns = [
      {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
        render: author => (
          <div className="centered-container" onClick={() => this.showModal(author.url)}>
            <div className="user-avatar">
              <Avatar src={author.avatar_url} size={70} />
            </div>
            <h4>{author.login}</h4>
          </div>
        ),
      },
      {
        title: 'Message',
        dataIndex: 'message',
        key: 'message',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Hash',
        dataIndex: 'hash',
        key: 'hash',
        render: hash => (
          <Link to={ `commit/${hash}`}>{hash}</Link>
        ),
      },
      {
        title: 'Parents Hash',
        dataIndex: 'parent_hash',
        key: 'parent_hash',
      },
    ];

    const display_data = this.state.commits.map(commit => (
      { author : commit.author,
        message : commit.commit.message.split('\n')[0],
        date : commit.commit.author.date,
        hash : commit.sha,
        parent_hash : commit.parents.map(parent => (
          parent.sha.substring(0,7)
        ))
      }
    ));
  
    return (
      <>
        <Table columns={columns} dataSource={display_data} pagination={false}/>
        <Pagination className="commits-pagination" current={this.state.page} 
         pageSize={commitsPerPage} total={1000} onChange={this.onChange} />
        <UserModal userUrl={this.state.userUrl} isModalVisible={this.state.isModalVisible}
         hideModal={this.hideModal}/>
      </>
    )
  }
}

export default CommitsTable;
