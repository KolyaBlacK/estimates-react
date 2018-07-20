import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Table from 'react-bootstrap/lib/Table'
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Modal from 'react-bootstrap/lib/Modal'
import ModalConfirmation from '../ModalConfirmation'
import ModalConfirmationAdd from '../ModalConfirmation'
import EditRateCards from './EditRateCards'
import SerializeForm from 'form-serialize'
import generateUniqueId from '../generateUniqueId'
import findArray from '../findArray'
import findStateArray from '../findStateArray'
import SelectRateCards from '../SelectRateCards'
import {
  loadRateCards,
  deleteRateCards,
  addRateCards,
  updateRateCards,
  loadDivisions,
  loadExperts

} from '../../actions';

const loadData = props => {
  props.loadRateCards();
};


class RateCards extends Component {
  constructor() {
    super();
    this.state = {
      showAddModal: false,
      showDeleteModal: false,
      showUpdateModal: false,
      showEditModal: false,
      showConfirmationModal: false,
      itemId: null,
      editName: '',
      ratecards: []
    };


    this.handleAdd = this.handleAdd.bind(this);
    this.closeAddModal = this.closeAddModal.bind(this);
    this.sendFormAddModal = this.sendFormAddModal.bind(this);
    this.handleAddRateCardRowForm = this.handleAddRateCardRowForm.bind(this);
    this.handleHideDeleteModal = this.handleHideDeleteModal.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.editRateCards = this.editRateCards.bind(this);
    this.changeFormControl = this.changeFormControl.bind(this);
    this.deleteRateCardItem = this.deleteRateCardItem.bind(this);
    this.handleHideConfirmationModal = this.handleHideConfirmationModal.bind(this);
    this.handleCloseAddModal = this.handleCloseAddModal.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  handleAdd() {
    this.setState({
      showAddModal: true
    });
  }

  closeAddModal() {
    this.setState({
      showAddModal: false,
      ratecards: []
    });
  }

  sendFormAddModal(e) {
    e.preventDefault();

    const target = e.target;
    const data = SerializeForm(target, {hash: true});
    const {addRateCards} = this.props;
    addRateCards(data);

    this.setState({
      showAddModal: false
    });

    this.props.loadDivisions();
    this.props.loadExperts();
  }

  deleteItem() {
    const {itemId} = this.state;
    const {deleteRateCards} = this.props;
    deleteRateCards(itemId);

    this.setState({
      itemId: null
    });
  }

  handleHideDeleteModal() {
    this.setState({
      showDeleteModal: false
    });
  }

  handleDeleteProduct(event) {
    const id = event.target.attributes.getNamedItem('data-id').value;

    this.setState({
      showDeleteModal: true,
      itemId: id
    });
  }

  handleEdit(event) {
    const editId = event.target.attributes.getNamedItem('data-id').value;
    const name = event.target.attributes.getNamedItem('data-name').value;
    this.setState({
      showEditModal: true,
      itemId: editId,
      editName: name
    });
  }

  closeEditModal() {
    this.setState({
      showEditModal: false,
      itemId: null,
      editName: ''
    });
  }

  editRateCards(e) {
    e.preventDefault();
    const target = e.target;
    const data = SerializeForm(target, {hash: true});
    const {itemId} = this.state;
    const {updateRateCards} = this.props;
    updateRateCards(itemId, data);

    this.setState({
      showEditModal: false,
      itemId: null
    });
  }

  renderRow(id, name, canEdit = false, canDelete = false, typeSetting = '') {
    return (
      <tr key={id}>
        <td>{name}</td>
        <td>
          <ButtonToolbar>
            {canEdit ?
              <Button bsStyle="primary" data-name={name} data-id={id} onClick={this.handleEdit}>Edit</Button> : null}
            {canDelete ? <Button data-type={typeSetting} data-id={id} bsStyle="danger"
                                 onClick={this.handleDeleteProduct}>Delete</Button> : null}
          </ButtonToolbar>
        </td>
      </tr>
    );
  }

  renderRateCards() {
    const {isLoading, data} = this.props.ratecards;
    const rows = data.map((ratecard) => {
      return this.renderRow(ratecard.id, ratecard.name, true, ratecard.delete);
    });

    return {
      isLoading: isLoading,
      rows: rows,
      eventKey: 5,
      title: 'Список рейт карт',
      canAdd: true,
      addTitle: 'Добавить рейт карту',
    };
  }

  renderRateCardRowForm(i) {
    return (
      <Row key={i}>
        {this.selectDivisions(i)}
        {this.selectExpert(i)}
        <Col xs={4}>
          <ControlLabel>Ставка в час</ControlLabel>
          <FormControl name={`data[${i}][amount]`} type="text" placeholder="Ставка ..."/>
        </Col>
      </Row>
    )
  }

  selectDivisions(i) {
    const {data} = this.props.divisions;
    return (
      <Col xs={4}>
        <ControlLabel>Подразделение</ControlLabel>
        <FormControl name={`data[${i}][division_id]`} componentClass="select" placeholder="Подразделение ...">
          {data.map((division, index) => {
            return <option key={index} value={division.id}>{division.name}</option>
          })}
        </FormControl>
      </Col>
    )
  }

  selectExpert(i) {
    const {data} = this.props.experts;
    return (
      <Col xs={4}>
        <ControlLabel>Эксперт</ControlLabel>
        <FormControl name={`data[${i}][expert_id]`} componentClass="select" placeholder="Эксперт ...">
          {data.map((expert, index) => {
            return <option key={index} value={expert.id}>{expert.name.en}</option>
          })}
        </FormControl>
      </Col>
    )
  }

  handleAddRateCardRowForm() {
    const id = generateUniqueId();
    const divisions = this.props.divisions.data;
    const experts = this.props.experts.data;
    const activeDivisonId = divisions[0].id;
    const filterExperts = this.state.ratecards.length > 0 ? findArray(this.state.ratecards, activeDivisonId, experts) : experts;
    const ratecard = {
      id,
      activeExpert: filterExperts[0].id,
      divisions,
      activeDivision: activeDivisonId,
      filterExperts,
      amount: 0
    };
    const stateArray = this.state.ratecards.slice();
    stateArray.push(ratecard);
    this.setState(
      {ratecards: stateArray}
    );
  }


  changeFormControl(Id, value) {
    const experts = this.props.experts.data;
    const divisionId = Id;
    const expertValue = value;
    const tempState = this.state.ratecards.slice();
    const tempStateIndex = this.state.ratecards.findIndex(({id}) => id === divisionId);
    const tempElement = this.state.ratecards.filter(({id}) => id === divisionId)[0];
    tempElement.activeExpert = expertValue;
    tempState.splice(tempStateIndex, 1, tempElement);

    const newState = findStateArray(tempState, divisionId, experts, expertValue);

    this.setState({
      ratecards: newState
    });
  }

  deleteRateCardItem(e) {
    const divisionId = Number(e.target.getAttribute('data-state-id'));
    const tempState = this.state.ratecards.filter(({id}) => id !== divisionId);

    this.setState({
      ratecards: tempState
    })
  }

  handleCloseAddModal() {
    this.setState({
      showConfirmationModal: true
    })
  }

  handleHideConfirmationModal() {
    this.setState({
      showConfirmationModal: false
    })
  }

  render() {
    const {isLoading, rows, eventKey, title, canAdd = false, addTitle = 'Добавить'} = this.renderRateCards();
    const {ratecards} = this.state;

    const editPopup = (this.state.showEditModal ?
      <EditRateCards defaultValue={this.state.editName} showEditModal={this.state.showEditModal}
                     closeEditModal={this.closeEditModal} idEditRateCard={this.state.itemId}/> : null);

    return (
      <div>
        <h2>{title}</h2>
        {isLoading ? (
          <p>Идет загрузка...</p>
        ) : (
          <Table className="settings-table">
            <tbody>
            {rows}
            </tbody>
          </Table>
        )}
        {canAdd ? <Button bsStyle="primary" onClick={this.handleAdd}>{addTitle}</Button> : null}

        <Modal show={this.state.showAddModal} onHide={this.handleCloseAddModal} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Добавить рейт карту</Modal.Title>
          </Modal.Header>

          <Form onSubmit={this.sendFormAddModal}>
            <Modal.Body>
              <FormGroup validationState={this.state.valid}>
                <ControlLabel>Введите имя</ControlLabel>
                <FormControl name="name" type="text" placeholder="Имя ..." ref="nameInput" required/>
              </FormGroup>
              <div>
                {ratecards.length ? ratecards.map((ratecard, index) => {
                  return (
                    <Row key={index}>
                      <Col xs={4}>
                        <ControlLabel>Подразделение</ControlLabel>
                        <FormControl data-state-id={ratecard.id} name={`data[${index}][division_id]`}
                                     componentClass="select" placeholder="Подразделение ...">
                          {ratecard.divisions.map((divisionSelect, index) => {
                            return <option key={index} value={divisionSelect.id}>{divisionSelect.name}</option>
                          })}
                        </FormControl>
                      </Col>
                      <Col xs={4}>
                        <ControlLabel>Эксперт</ControlLabel>
                        <SelectRateCards experts={ratecard.filterExperts} index={index}
                                         changeFormControl={this.changeFormControl} idInArray={ratecard.id}
                                         activeExpert={ratecard.activeExpert}/>

                      </Col>
                      <Col xs={4}>
                        <ControlLabel>Ставка в час</ControlLabel>
                        <Row>
                          <Col xs={8}>
                            <FormControl name={`data[${index}][amount]`} type="text" placeholder="Ставка ..."/>
                          </Col>
                          <Col xs={4}>
                            <Button className="pull-right" bsStyle="danger" data-state-id={ratecard.id}
                                    onClick={this.deleteRateCardItem}>Удалить</Button>
                          </Col>
                        </Row>
                      </Col>

                    </Row>
                  )
                }) : null}
              </div>
              <hr/>
              <Button onClick={this.handleAddRateCardRowForm}>Добавить специалиста</Button>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleCloseAddModal}>Отмена</Button>
              <Button type="submit">Добавить</Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <ModalConfirmationAdd onShowModal={this.state.showConfirmationModal}
                              onHideModal={this.handleHideConfirmationModal}
                              action={this.closeAddModal}
                              actionTitle="Вы действительно хотите выйти без сохранения введенных данных?"/>
        <ModalConfirmation onShowModal={this.state.showDeleteModal} onHideModal={this.handleHideDeleteModal}
                           action={this.deleteItem} actionTitle="Удалить?"/>

        {editPopup}
      </div>
    )
  }
}

RateCards.propTypes = {
  ratecards: PropTypes.object.isRequired,
  loadRateCards: PropTypes.func.isRequired,
  deleteRateCards: PropTypes.func.isRequired,
  addRateCards: PropTypes.func.isRequired,
  updateRateCards: PropTypes.func.isRequired,
  divisions: PropTypes.object.isRequired,
  experts: PropTypes.object.isRequired,
  loadDivisions: PropTypes.func.isRequired,
  loadExperts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {

  const {ratecards, divisions, experts} = state;

  return {ratecards, divisions, experts};
};

export default connect(mapStateToProps, {
  loadRateCards,
  deleteRateCards,
  addRateCards,
  updateRateCards,
  loadDivisions,
  loadExperts
})(RateCards);
