import React, {Component} from 'react';
import PropTypes, {element} from 'prop-types';
import {connect} from 'react-redux';
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Modal from 'react-bootstrap/lib/Modal'
import {getRateCard} from '../../helpers/getRateCard'
import findArray from '../findArray'
import findStateArray from '../findStateArray'
import SelectRateCards from '../SelectRateCards'
import generateUniqueId from '../generateUniqueId'
import ModalConfirmation from '../ModalConfirmation'
import SerializeForm from 'form-serialize'
import {
  deleteRateCards,
  addRateCards,
  updateRateCards,
  loadDivisions,
  loadExperts

} from '../../actions';

class EditRateCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      showDeleteModal: false,
      showUpdateModal: false,
      showEditModal: false,
      showConfirmationModal: false,
      rateCard: []
    };

    this.editRateCards = this.editRateCards.bind(this);
    this.handleAddRateCardRowForm = this.handleAddRateCardRowForm.bind(this);
    this.changeFormControl = this.changeFormControl.bind(this);
    this.deleteRateCardItem = this.deleteRateCardItem.bind(this);
    this.handleCloseEditModal = this.handleCloseEditModal.bind(this);
    this.handleHideConfirmationModal = this.handleHideConfirmationModal.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
  }

  componentDidMount() {
    getRateCard(this.props.idEditRateCard).then(
      result => {
        const data = result.data[0].experts;
        const experts = this.props.experts.data;
        let activeExpertsArray = [];
        data.map((element) => activeExpertsArray.push(element.expert.id));
        data.map((element) => {
          element.filterExperts = experts.filter(({id}) => id === element.expert.id);
          experts.filter(({id}) => activeExpertsArray.every(activeId => activeId !== id)).map((expert) => element.filterExperts.push(expert));
          element.activeExpert = element.expert.id;
          element.id = generateUniqueId();
        });

        this.setState({
          rateCard: data
        });
      },
      error => {
        console.log(error)
      }
    );

  }

  editRateCards(e) {
    e.preventDefault();
    const target = e.target;
    const data = SerializeForm(target, {hash: true});
    const {updateRateCards} = this.props;
    updateRateCards(this.props.idEditRateCard, data);

    this.props.closeEditModal();
  }

  handleAddRateCardRowForm() {
    const id = generateUniqueId();
    const divisions = this.props.divisions.data;
    const experts = this.props.experts.data;
    const activeDivisonId = divisions[0].id;
    const filterExperts = this.state.rateCard.length > 0 ? findArray(this.state.rateCard, activeDivisonId, experts) : experts;

    const ratecard = {
      id,
      activeExpert: filterExperts[0].id,
      divisions,
      activeDivision: activeDivisonId,
      filterExperts,
      amount: 0
    };
    const stateArray = this.state.rateCard.slice();
    stateArray.push(ratecard);
    this.setState({
      rateCard: stateArray
    });
  }

  changeFormControl(Id, value) {
    const experts = this.props.experts.data;
    const divisionId = Id;
    const expertValue = value;

    const tempState = this.state.rateCard.slice();
    const tempStateIndex = this.state.rateCard.findIndex(({id}) => id === divisionId);
    const tempElement = this.state.rateCard.filter(({id}) => id === divisionId)[0];
    tempElement.activeExpert = expertValue;
    tempState.splice(tempStateIndex, 1, tempElement);

    const newState = findStateArray(tempState, divisionId, experts, expertValue);

    this.setState({
      rateCard: newState
    });
  }

  deleteRateCardItem(e) {
    const divisionId = Number(e.target.getAttribute('data-state-id'));
    const tempState = this.state.rateCard.filter(({id}) => id !== divisionId);

    this.setState({
      rateCard: tempState
    })
  }

  handleCloseEditModal() {
    this.setState({
      showConfirmationModal: true
    })
  }

  handleHideConfirmationModal() {
    this.setState({
      showConfirmationModal: false
    })
  }

  closeEditModal() {
    this.props.closeEditModal();
  }

  render() {
    return (
      <div>
        <Modal show={this.props.showEditModal} onHide={this.handleCloseEditModal} bsSize="large">
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.editRateCards}>
            <Modal.Body>
              <FormGroup validationState={this.state.valid}>
                <ControlLabel>Введите имя</ControlLabel>
                <FormControl defaultValue={this.props.defaultValue} name="name" type="text" placeholder="Имя ..."
                             ref="nameInput" required/>
              </FormGroup>

              {this.state.rateCard.length ? this.state.rateCard.map((expert, index) => {
                return (
                  <Row key={index}>
                    <Col xs={4}>
                      <ControlLabel>Подразделение</ControlLabel>
                      <FormControl defaultValue={expert.division.id} data-state-id={expert.id}
                                   name={`data[${index}][division_id]`} componentClass="select"
                                   placeholder="Подразделение ...">
                        {this.props.divisions.data.map((divisionSelect, index) => {
                          return <option key={index} value={divisionSelect.id}>{divisionSelect.name}</option>
                        })}
                      </FormControl>
                    </Col>
                    <Col xs={4}>
                      <ControlLabel>Эксперт</ControlLabel>
                      <SelectRateCards experts={expert.filterExperts} index={index}
                                       changeFormControl={this.changeFormControl} idInArray={expert.id}
                                       activeExpert={expert.activeExpert}/>
                    </Col>
                    <Col xs={4}>
                      <ControlLabel>Ставка в час</ControlLabel>
                      <Row>
                        <Col xs={8}>
                          <FormControl defaultValue={expert.amount} name={`data[${index}][amount]`} type="text"
                                       placeholder="Ставка ..."/>
                        </Col>
                        <Col xs={4}>
                          <Button className="pull-right" bsStyle="danger" data-state-id={expert.id}
                                  onClick={this.deleteRateCardItem}>Удалить</Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                )
              }) : null}
              <hr/>
              <Button onClick={this.handleAddRateCardRowForm}>Добавить специалиста</Button>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleCloseEditModal}>Отмена</Button>
              <Button type="submit">Сохранить</Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <ModalConfirmation onShowModal={this.state.showConfirmationModal} onHideModal={this.handleHideConfirmationModal}
                           action={this.closeEditModal}
                           actionTitle="Вы действительно хотите выйти без сохранения введенных данных?"/>
      </div>
    )
  }
}

EditRateCards.propTypes = {
  ratecards: PropTypes.object.isRequired,
  divisions: PropTypes.object.isRequired,
  deleteRateCards: PropTypes.func.isRequired,
  addRateCards: PropTypes.func.isRequired,
  updateRateCards: PropTypes.func.isRequired,
  experts: PropTypes.object.isRequired,
  loadDivisions: PropTypes.func.isRequired,
  loadExperts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {

  const {ratecards, divisions, experts} = state;

  return {ratecards, divisions, experts};
};

export default connect(mapStateToProps, {
  deleteRateCards,
  addRateCards,
  updateRateCards,
  loadDivisions,
  loadExperts
})(EditRateCards);
