import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid'
import Table from 'react-bootstrap/lib/Table'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import {Link} from 'react-router'
import ItemEstimatesDraft from '../components/ItemEstimatesDraft'
import ModalConfirmation from '../components/ModalConfirmation'
import {
  loadDraftEstimates,
  unArchivedEstimates
} from '../actions';

const loadData = props => {
  props.loadDraftEstimates();
};

class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      varShow: false,
      showExpertsModal: false,
      itemId: null
    };
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleHideModal = this.handleHideModal.bind(this);
    this.unArchiveItem = this.unArchiveItem.bind(this);

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

  unArchiveItem() {
    const {unArchivedEstimates} = this.props;
    unArchivedEstimates(this.state.itemId);
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
        <Grid>
          <Row>
            <Col xs={4}>
              <Link className="btn btn-primary" to="/">Назад</Link>
            </Col>
          </Row>
          <hr/>
        </Grid>
        <Grid>
          <Table>
            <thead>
            <tr>
              <th></th>
              <th>Системное<br/>название проекта</th>
              <th>Сумма без НДС</th>
              <th>Сумма с НДС</th>
              <th>Дата создания</th>
              <th>Дата <br/> последнего обновления</th>
              <th>Название рейткарты</th>
            </tr>
            </thead>
            <ItemEstimatesDraft onShowModal={this.handleShowModal} estimates={this.props.data}/>
          </Table>
        </Grid>
        <ModalConfirmation actionTitle={'Вернуть из архива ?'} onShowModal={this.state.varShow}
                           onHideModal={this.handleHideModal}
                           action={this.unArchiveItem}/>
      </div>
    )
  }
}


Draft.propTypes = {
  data: PropTypes.array.isRequired,
  loadDraftEstimates: PropTypes.func.isRequired,
  unArchivedEstimates: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {

  const {data} = state.draft;

  return {data};
};

export default connect(mapStateToProps, {
  loadDraftEstimates,
  unArchivedEstimates,
})(Draft);
