import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Grid from 'react-bootstrap/lib/Grid'
import Table from 'react-bootstrap/lib/Table'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import {Link} from 'react-router'
import ItemEstimates from './ItemEstimates'
import ModalConfirmation from './ModalConfirmation'

import {
  loadEstimates,
  deleteEstimates,
  archivedAddEstimates
} from '../actions';

const loadData = props => {
  props.loadEstimates();
};

class ListEstimates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      varShow: false,
      showExpertsModal: false,
      itemId: null
    };
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
    this.archiveItem = this.archiveItem.bind(this);

    this.onShowExpertsModal = this.onShowExpertsModal.bind(this);
    this.onHideExpertsModal = this.onHideExpertsModal.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }


  handleShowModal(id) {
    this.setState({
      varShow: true,
      itemId: id
    });
  }

  handleHideModal() {
    this.setState({
      varShow: false,
      itemId: null
    });
  }

  archiveItem() {
    const {archivedAddEstimates} = this.props;
    archivedAddEstimates(this.state.itemId);
    this.setState({
      itemId: null
    })
  }

  onShowExpertsModal(id, experts) {
    this.setState({
      showExpertsModal: true,
      itemId: id,
      experts: experts
    });
  }

  onHideExpertsModal() {
    this.setState({
      showExpertsModal: false,
      itemId: null,
      experts: null
    });
  }


  render() {
    return (
      <div>
        <Grid className="margin-bottom-30">
          <Row>
            <Col xs={3}>
              <h1 className="margin-none">Список смет</h1>
            </Col>
            <Col xs={1}>
              <Link className="btn btn-primary" to="/archive">Архив</Link>
            </Col>
            <Col xs={1}>
              <Link className="btn btn-primary" to="/draft">Черновики</Link>
            </Col>
            <Col xsPush={4} xs={3}>
              <Link className="btn btn-primary" to="/settings">Настройки</Link>
              <Link className="btn btn-success pull-right" to="/estimate/create">Добавить смету</Link>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <div className="relative">
            <div className="wrap-table">
              <Table className="list-estimates-table">
                <thead>
                <tr>
                  <th className="left-col"></th>
                  <th>Внутреннее<br/>название проекта</th>
                  <th>Сумма без НДС</th>
                  <th>Сумма с НДС</th>
                  <th>Дата создания</th>
                  <th>Дата <br/> последнего обновления</th>
                  <th>Название рейткарты</th>
                  <th>
                    Специалисты<br/>
                    <div>Часы | Руб</div>
                  </th>
                </tr>
                </thead>
                <ItemEstimates estimates={this.props.estimates.data} onShowModal={this.handleShowModal}
                               onShowExpertsModal={this.onShowExpertsModal}/>
              </Table>
            </div>
          </div>
        </Grid>
        <ModalConfirmation actionTitle={'Отправить в архив ?'} onShowModal={this.state.varShow}
                           onHideModal={this.handleHideModal}
                           action={this.archiveItem}/>

      </div>
    )
  }
}

ListEstimates.propTypes = {
  estimates: PropTypes.object.isRequired,
  loadEstimates: PropTypes.func.isRequired,
  deleteEstimates: PropTypes.func.isRequired,
  archivedAddEstimates: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {

  const {estimates} = state;

  return {estimates};
};

export default connect(mapStateToProps, {
  loadEstimates,
  deleteEstimates,
  archivedAddEstimates
})(ListEstimates);
