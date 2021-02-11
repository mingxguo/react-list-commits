import React from 'react';
import { Layout } from 'antd';
import CommitsTable from '../app/CommitsTable';
import AppHeader from '../common/Header';

const { Header, Footer, Content } = Layout;

// Main page component. 
// Shows a table of commits of the react repository.
function MainPage(){
  return (
    <Layout>
      <Header className="app-header">
        <AppHeader/>
      </Header>
      <Content className="app-content">
        <div className="commits-subtitle"> Latest commits </div>
        <CommitsTable />
      </Content>
      <Footer />
    </Layout>
  );
}

export default MainPage;
