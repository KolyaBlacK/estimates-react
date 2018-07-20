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
  loadExperts,
  deleteExperts,
  addExperts,
  updateExperts
} from '../../actions';

const loadData = props => {
  props.loadExperts();
};


class Experts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showDeleteModal: false,
      showEditModal: false,
      itemId: null,
      editNameRu: '',
      editNameEn: ''
    };

    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.sendFormModal = this.sendFormModal.bind(this);
    this.handleHideDeleteModal = this.handleHideDeleteModal.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.editExpert = this.editExpert.bind(this);
  }

  componentWillMount() {
    loadData(this.props);
  }

  handleDeleteProduct(event) {
    const id = event.target.attributes.getNamedItem('data-id').value;

    this.setState({
      showDeleteModal: true,
      itemId: id
    });
  }

  handleAdd() {
    this.showModal();
  }

  showModal() {
    this.setState({
      showModal: true
    });
  }

  closeModal() {
    this.setState({
      showModal: false
    });
  }

  sendFormModal(e) {
    e.preventDefault();
    const target = e.target;

    const data = SerializeForm(target, {hash: true});
    const {addExperts} = this.props;
    addExperts(data);

    this.setState({
      showModal: false
    });
  }

  handleHideDeleteModal() {
    this.setState({
      showDeleteModal: false
    });
  }

  deleteItem() {
    const {itemId} = this.state;
    const {deleteExperts} = this.props;
    deleteExperts(itemId);

    this.setState({
      itemId: null
    });
  }

  handleEdit(event) {
    const id = event.target.attributes.getNamedItem('data-id').value;
    const nameRu = event.target.attributes.getNamedItem('data-name-ru').value;
    const nameEn = event.target.attributes.getNamedItem('data-name-en').value;
    this.setState({
      showEditModal: true,
      itemId: id,
      editNameRu: nameRu,
      editNameEn: nameEn
    });
  }

  closeEditModal() {
    this.setState({
      showEditModal: false,
      editNameRu: '',
      editNameEn: ''
    });
  }

  editExpert(e) {
    e.preventDefault();
    const target = e.target;
    const data = SerializeForm(target, {hash: true});

    const {itemId} = this.state;
    const {updateExperts} = this.props;
    updateExperts(itemId, data);

    this.setState({
      showEditModal: false,
      itemId: null
    });
  }

  renderRow(id, nameRu, nameEn, canEdit, canDelete) {
    return (
      <tr key={id}>
        <td>{nameEn}</td>
        <td>
          <ButtonToolbar>
            {canEdit ? <Button bsStyle="primary" data-name-ru={nameRu} data-name-en={nameEn} data-id={id}
                               onClick={this.handleEdit}>Edit</Button> : null}
            {canDelete ? <Button data-id={id} bsStyle="danger"
                                 onClick={this.handleDeleteProduct}>Delete</Button> : null}
          </ButtonToolbar>
        </td>
      </tr>
    );
  }

  /**
   * Render experts tab
   */
  renderExperts() {
    const {isLoading, data} = this.props.experts;
    const rows = data.map((expert) => {
      return this.renderRow(expert.id, expert.name.ru, expert.name.en, true, expert.delete);
    });

    return {
      isLoading: isLoading,
      rows: rows,
      eventKey: 5,
      title: 'Список специалистов',
      canAdd: true,
      addTitle: 'Добавить специалиста',
    };
  }


  render() {
    const {isLoading, rows, eventKey, title, canAdd = false, addTitle = 'Добавить'} = this.renderExperts();
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


        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Введите название</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.sendFormModal}>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Введите имя ru</ControlLabel>
                <FormControl name="name_ru" type="text" placeholder="Имя ru ..." required/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Введите имя en</ControlLabel>
                <FormControl name="name_en" type="text" placeholder="Имя en ..." required/>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeModal}>Отмена</Button>
              <Button type="submit">Добавить</Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <Modal show={this.state.showEditModal} onHide={this.closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Изменить специалиста</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.editExpert}>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Введите имя ru</ControlLabel>
                <FormControl defaultValue={this.state.editNameRu} name="name_ru" type="text" placeholder="Имя ru ..."
                             required/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Введите имя en</ControlLabel>
                <FormControl defaultValue={this.state.editNameEn} name="name_en" type="text" placeholder="Имя en ..."
                             required/>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeEditModal}>Отмена</Button>
              <Button type="submit">Изменить</Button>
            </Modal.Footer>
          </Form>
        </Modal>

        <ModalConfirmation onShowModal={this.state.showDeleteModal} onHideModal={this.handleHideDeleteModal}
                           action={this.deleteItem} actionTitle="Удалить?"/>

      </div>
    )
  }
}

Experts.propTypes = {
  experts: PropTypes.object.isRequired,
  loadExperts: PropTypes.func.isRequired,
  deleteExperts: PropTypes.func.isRequired,
  addExperts: PropTypes.func.isRequired,
  updateExperts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {

  const {experts} = state;

  return {experts};
};

export default connect(mapStateToProps, {
  loadExperts,
  deleteExperts,
  addExperts,
  updateExperts
})(Experts);
