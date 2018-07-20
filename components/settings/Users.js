import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Table from 'react-bootstrap/lib/Table'
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Modal from 'react-bootstrap/lib/Modal'
import FormAddUser from './FormAddUser'
import FormEditUser from './FormEditUser'
import ModalConfirmation from '../ModalConfirmation'
import ModalSuccess from '../ModalSuccess';
import {
  loadUsers,
  deleteUsers,
  addUsers,
  updateUsers
} from '../../actions';

const loadData = props => {
  props.loadUsers();
};

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      showDeleteModal: false,
      showEditModal: false,
      itemId: null,
      editName: '',
      activeChecked: true,
      showSuccessModal: false,
      textSuccessModal: 'Save'
    };

    this.closeAddModal = this.closeAddModal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.sendFormAddModal = this.sendFormAddModal.bind(this);

    this.handleDeleteUsers = this.handleDeleteUsers.bind(this);
    this.handleHideDeleteModal = this.handleHideDeleteModal.bind(this);
    this.deleteItem = this.deleteItem.bind(this);

    this.handleEdit = this.handleEdit.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.sendFormEditModal = this.sendFormEditModal.bind(this);

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
      showAddModal: false
    });
  }

  sendFormAddModal(data) {
    const {addUsers} = this.props;
    addUsers(data).then(
      responce => {
        if (responce.error) {
          this.setState({
            showSuccessModal: true,
            textSuccessModal: responce.error
          });
        } else {
          this.setState({
            showSuccessModal: true
          });
        }
      }
    );

    this.setState({
      showAddModal: false
    });
  }

  handleDeleteUsers(event) {
    const id = event.target.attributes.getNamedItem('data-id').value;

    this.setState({
      showDeleteModal: true,
      itemId: id
    });
  }

  deleteItem() {
    const {itemId} = this.state;
    const {deleteUsers} = this.props;
    deleteUsers(itemId);

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

  sendFormEditModal(data) {

    const {itemId} = this.state;
    const {updateUsers} = this.props;
    updateUsers(itemId, data).then(
      responce => {
        if (responce.error) {
          console.log(responce);
          this.setState({
            showSuccessModal: true,
            textSuccessModal: responce.error
          });
        } else {
          this.setState({
            showSuccessModal: true
          });
        }
      }
    );

    this.setState({
      showEditModal: false,
      itemId: null
    });
  }

  renderRow(user) {
    return (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>
          <ButtonToolbar>
            {/*{canEdit ? <Button bsStyle="primary">Edit</Button> : null}*/}
            <Button bsStyle="primary" data-name={user.name} data-id={user.id} onClick={this.handleEdit}>Edit</Button>
            {user.delete ? <Button data-id={user.id} bsStyle="danger"
                                   onClick={this.handleDeleteUsers}>Delete</Button> : null}
          </ButtonToolbar>
        </td>
      </tr>
    );
  }

  renderUsers() {
    const {isLoading, data} = this.props.users;
    const rows = data.map((user) => {
      return this.renderRow(user);
    });

    return {
      isLoading: isLoading,
      rows: rows,
      eventKey: 5,
      title: 'Список пользователей',
      canAdd: true,
      addTitle: 'Добавить пользователя',
    };
  }

  selectDivisions() {
    const {data} = this.props.divisions;
    return data
  }

  hideSuccessModal() {
    this.setState({
      showSuccessModal: false,
      textSuccessModal: 'Save'
    });
  }

  render() {
    const {isLoading, rows, eventKey, title, canAdd = false, addTitle = 'Добавить'} = this.renderUsers();
    const dataUser = this.state.itemId !== null ? this.props.users.data.filter(({id}) => id == this.state.itemId)[0] : null;
    return (
      <div>
        <h2>{title}</h2>
        {canAdd ?
          <Button style={{marginBottom: '10px'}} bsStyle="primary" onClick={this.handleAdd}>{addTitle}</Button> : null}
          {isLoading ? (
            <p>Идет загрузка...</p>
          ) : (
            <Table className="settings-table">
              <tbody>
              {rows}
              </tbody>
            </Table>
          )}

        <Modal show={this.state.showAddModal} onHide={this.closeAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить пользователя</Modal.Title>
          </Modal.Header>
          {this.state.showAddModal ? <FormAddUser selectDivisions={this.selectDivisions()} onHide={this.closeAddModal}
                                                  sendFormAddModal={this.sendFormAddModal}/> : null}
        </Modal>


        <Modal show={this.state.showEditModal} onHide={this.closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Изменить пользователя</Modal.Title>
          </Modal.Header>
          {this.state.showEditModal ?
            <FormEditUser dataUser={dataUser} selectDivisions={this.selectDivisions()} onHide={this.closeEditModal}
                          sendFormEditModal={this.sendFormEditModal}/> : null}
        </Modal>

        <ModalConfirmation onShowModal={this.state.showDeleteModal} onHideModal={this.handleHideDeleteModal}
                           action={this.deleteItem} actionTitle="Удалить?"/>

        <ModalSuccess onShowModal={this.state.showSuccessModal} onHideModal={this.hideSuccessModal.bind(this)}
                      actionTitle={this.state.textSuccessModal}/>

      </div>
    )
  }
}

Users.propTypes = {
  users: PropTypes.object.isRequired,
  loadUsers: PropTypes.func.isRequired,
  deleteUsers: PropTypes.func.isRequired,
  addUsers: PropTypes.func.isRequired,
  updateUsers: PropTypes.func.isRequired,
  divisions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {

  const {users, divisions} = state;

  return {users, divisions};
};

export default connect(mapStateToProps, {
  loadUsers,
  deleteUsers,
  addUsers,
  updateUsers
})(Users);
