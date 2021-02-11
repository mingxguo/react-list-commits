import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../common/Loading';
import CommitUser from './CommitUser';
import CommitFiles from './CommitFiles';
import CommitMessage from './CommitMessage';

// Main content component of a commit page.
class CommitContent extends Component {

  constructor(props){
    super(props);
    this.state = {
      commit: null,
      userUrl: "",
      loading: true,
      isModalVisible : false,
    };
  }

  loadCommit(){
    axios.get(`https://api.github.com/repos/facebook/react/commits/${this.props.hash}`
    ).then(res => {
      this.setState({
        commit: res.data,
        loading: false,
      })
    });
  };
  
  componentDidMount() {
    this.loadCommit();
  };

  render() {
    if (this.state.loading) {
      return <Loading/>
    }
    const commit = this.state.commit;
    const message = commit.commit.message.split('\n');
    return (
      <div className="commit-container">
        <CommitMessage message={message}/>
        <CommitUser commit={commit}/>
        <CommitFiles commit={commit}/>        
      </div>
    );
  }
}

export default CommitContent;
