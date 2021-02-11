import React from 'react';
import { List, Row, Col } from 'antd';

// Changed files component of a commit page.
function CommitFiles(props) {
  return (
    <Row>
      <Col span={24}>
        <div className="commit-component">
          <h3> Changed files</h3>
          <List dataSource={props.commit.files}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.filename}
                  description= {<div> {item.additions} additions
                  and {item.deletions} deletions</div>}
                />
              </List.Item>
          )}/>
        </div>
      </Col>
    </Row>
  );
}

export default CommitFiles;
