import React from 'react';
import { Row, Col, Divider } from 'antd';

// Commit message component of a commit page.
function CommitMessage(props) {
  return (
    <Row>
      <Col span={24}>
        <div className="commit-component">
          <h3> {props.message[0]} </h3>
          <p> {props.message.slice(1)} </p>
          <Divider/>
        </div>
      </Col>
    </Row>
  );
}

export default CommitMessage;
