import React from 'react';
import { Layout,  Breadcrumb } from 'antd';
import { Link } from "react-router-dom";
import AppHeader from '../common/Header';
import CommitContent from '../app/CommitContent';

const { Header, Footer, Content } = Layout;

// Commit page component.
// Shows the commit message, commit author information and a list
// of changed files of a single commit.
function CommitPage(props){
  const commitHash = props.match.params.hash;
  return (
    <Layout>
      <Header className="app-header">
        <AppHeader/>
      </Header>
      <Content className="app-content">
        <Breadcrumb className="commit-breadcrumb">
          <Breadcrumb.Item>
            <Link to={`/`}> Home </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item> Commit {commitHash}</Breadcrumb.Item>
        </Breadcrumb>
        <CommitContent hash={commitHash}/>
      </Content>
      <Footer />
    </Layout>
  );
}

export default CommitPage;
