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
import Modal from 'react-bootstrap/lib/Modal'
import ModalConfirmation from '../ModalConfirmation'
import SerializeForm from 'form-serialize'
import {
  loadDivisions,
  deleteDivisions,
  addDivisions,
  updateDivisions
} from '../../actions';

const loadData = props => {
  props.loadDivisions();
};

class Divisions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      showDeleteModal: false,
      showEditModal: false,
      itemId: null,
      editName: ''
    };

    this.closeAddModal = this.closeAddModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.sendFormAddModal = this.sendFormAddModal.bind(this);
    this.handleHideDeleteModal = this.handleHideDeleteModal.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.editDivision = this.editDivision.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  handleAdd() {
    this.setState({
      showAddModal: true
    });
  }

  sendFormAddModal(e) {
    e.preventDefault();
    const target = e.target;

    const data = SerializeForm(target, {hash: true});
    const {addDivisions} = this.props;
    addDivisions(data);

    this.setState({
      showAddModal: false
    });
  }

  closeAddModal() {
    this.setState({
      showAddModal: false
    });
  }

  handleDeleteProduct(event) {
    const id = event.target.attributes.getNamedItem('data-id').value;

    this.setState({
      showDeleteModal: true,
      itemId: id
    });
  }

  deleteItem() {
    const {itemId} = this.state;
    const {deleteDivisions} = this.props;
    deleteDivisions(itemId);

    this.setState({
      itemId: null
    });
  }

  handleHideDeleteModal() {
    this.setState({
      showDeleteModal: false
    });
  }

  handleEdit(event) {
    const id = event.target.attributes.getNamedItem('data-id').value;
    const name = event.target.attributes.getNamedItem('data-name').value;
    this.setState({
      showEditModal: true,
      itemId: id,
      editName: name
    });
  }

  closeEditModal() {
    this.setState({
      showEditModal: false,
      editName: ''
    });
  }

  editDivision(e) {
    e.preventDefault();
    const target = e.target;
    const data = SerializeForm(target, {hash: true});

    const {itemId} = this.state;
    const {updateDivisions} = this.props;
    updateDivisions(itemId, data);

    this.setState({
      showEditModal: false,
      itemId: null
    });
  }

  renderRow(id, name, canEdit = false, canDelete = false) {
    return (
      <tr key={id}>
        <td>{name}</td>
        <td>
          <ButtonToolbar>
            {canEdit ?
              <Button bsStyle="primary" data-name={name} data-id={id} onClick={this.handleEdit}>Edit</Button> : null}
            {canDelete ? <Button data-id={id} bsStyle="danger"
                                 onClick={this.handleDeleteProduct}>Delete</Button> : null}
          </ButtonToolbar>
        </td>
      </tr>
    );
  }

  renderDivisions() {
    const {isLoading, data} = this.props.divisions;
    const rows = data.map((division) => {
      return this.renderRow(division.id, division.name, true, division.delete);
    });

    return {
      isLoading: isLoading,
      rows: rows,
      eventKey: 5,
      title: 'Список подразделений',
      canAdd: true,
      addTitle: 'Добавить подразделение',
    };
  }


  render() {
    const {isLoading, rows, eventKey, title, canAdd = false, addTitle = 'Добавить'} = this.renderDivisions();
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


        <Modal show={this.state.showAddModal} onHide={this.closeAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Введите название</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.sendFormAddModal}>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Введите имя</ControlLabel>
                <FormControl name="name" type="text" placeholder="Имя ..." required/>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeAddModal}>Отмена</Button>
              <Button type="submit">Добавить</Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal show={this.state.showEditModal} onHide={this.closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Изменить подразделение</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.editDivision}>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Введите имя</ControlLabel>
                <FormControl defaultValue={this.state.editName} name="name" type="text" placeholder="Имя ..." required/>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeEditModal}>Отмена</Button>
              <Button type="submit">Добавить</Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <ModalConfirmation onShowModal={this.state.showDeleteModal} onHideModal={this.handleHideDeleteModal}
                           action={this.deleteItem} actionTitle="Удалить?"/>

      </div>
    )
  }
}

Divisions.propTypes = {
  divisions: PropTypes.object.isRequired,
  loadDivisions: PropTypes.func.isRequired,
  deleteDivisions: PropTypes.func.isRequired,
  addDivisions: PropTypes.func.isRequired,
  updateDivisions: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {

  const {divisions} = state;

  return {divisions};
};

export default connect(mapStateToProps, {
  loadDivisions,
  deleteDivisions,
  addDivisions,
  updateDivisions
})(Divisions);
