import React, {Component} from 'react';
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import {Tab, NavItem, Nav} from 'react-bootstrap';
import {Link} from 'react-router';
import Blocks from '../components/settings/Blocks';
import Divisions from '../components/settings/Divisions';
import Experts from '../components/settings/Experts';
import Productions from '../components/settings/Productions';
import RateCards from '../components/settings/RateCards';
import Tasks from '../components/settings/Tasks';
import Users from '../components/settings/Users';

class Settings extends Component {

  render() {
    return (
      <div>
        <Grid className="">
          <Row>
            <Col xs={4}>
              <Link className="btn btn-primary" to="/">Назад</Link>
            </Col>
          </Row>
          <hr/>

        </Grid>

        <Grid>
          <Tab.Container defaultActiveKey={1} id="tabs-settings">
            <div>
              <Nav bsStyle="tabs">
                <NavItem key={1} eventKey={1}>
                  Список продуктов
                </NavItem>
                <NavItem key={2} eventKey={2}>
                  Список тасков
                </NavItem>
                <NavItem key={3} eventKey={3}>
                  Список блоков
                </NavItem>
                <NavItem key={4} eventKey={4}>
                  Список рейт карт
                </NavItem>
                <NavItem key={5} eventKey={5}>
                  Список специалистов
                </NavItem>
                <NavItem key={6} eventKey={6}>
                  Список подразделений
                </NavItem>
                <NavItem key={7} eventKey={7}>
                  Список пользователей
                </NavItem>
              </Nav>
              <Tab.Content animation>
                <Tab.Pane key={1} eventKey={1}>
                  <Productions/>
                </Tab.Pane>
                <Tab.Pane key={2} eventKey={2}>
                  <Tasks/>
                </Tab.Pane>
                <Tab.Pane key={3} eventKey={3}>
                  <Blocks/>
                </Tab.Pane>
                <Tab.Pane key={4} eventKey={4}>
                  <RateCards/>
                </Tab.Pane>
                <Tab.Pane key={5} eventKey={5}>
                  <Experts/>
                </Tab.Pane>
                <Tab.Pane key={6} eventKey={6}>
                  <Divisions/>
                </Tab.Pane>
                <Tab.Pane key={7} eventKey={7}>
                  <Users/>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </Grid>
      </div>
    )
  }
}

export default Settings;
