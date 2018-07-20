import React, {Component} from 'react';
import Grid from 'react-bootstrap/lib/Grid'
import {Link} from 'react-router'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Button from 'react-bootstrap/lib/Button'

class Header extends Component {
  render() {
    return (
      <Grid className="margin-bottom-30">
        <Row>
          <Col xs={3}>
            <h1 className="margin-none">Список смет</h1>
          </Col>
          <Col xs={2}>
            <Button bsStyle="primary">Архив</Button>
          </Col>
          <Col xsPush={3} xs={4}>
            <ButtonToolbar className="pull-right">
              <Button bsStyle="primary">Export</Button>
              <Link className="btn btn-primary" to="/settings">Настройки</Link>
              <Link className="btn btn-primary" to="/edit">Добавить смету</Link>
            </ButtonToolbar>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Header
