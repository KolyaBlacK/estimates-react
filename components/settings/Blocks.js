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
  loadBlocks,
  deleteBlocks,
  addBlocks,
  updateBlocks
} from '../../actions';

const loadData = props => {
  props.loadBlocks();
};

class Blocks extends Component {
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
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
    this.handleHideDeleteModal = this.handleHideDeleteModal.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.editBlock = this.editBlock.bind(this);
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

  sendFormAddModal(e) {
    e.preventDefault();
    const target = e.target;
    const data = SerializeForm(target, {hash: true});
    const {addBlocks} = this.props;
    addBlocks(data);

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
    const {deleteBlocks} = this.props;
    deleteBlocks(itemId);

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

  editBlock(e) {
    e.preventDefault();
    const target = e.target;
    const data = SerializeForm(target, {hash: true});

    const {itemId} = this.state;
    const {updateBlocks} = this.props;
    updateBlocks(itemId, data);

    this.setState({
      showEditModal: false,
      itemId: null
    });
  }

  renderRow(divBlock, name, id) {

    return (
      <div key={id}>
        <b>{name}</b>
        <Table className="settings-table">
          <tbody>
          {divBlock.map((block) => {
            return (
              <tr key={block.id}>
                <td>{block.name}</td>
                <td>
                  <ButtonToolbar>
                    <Button bsStyle="primary" data-name={block.name} data-id={block.id}
                            onClick={this.handleEdit}>Edit</Button>
                    {block.delete ? <Button data-type={''} data-id={block.id} bsStyle="danger"
                                            onClick={this.handleDeleteProduct}>Delete</Button> : null}
                  </ButtonToolbar>
                </td>
              </tr>
            )

          })}
          </tbody>
        </Table>
      </div>
    );
  }

  /**
   * Render blocks tab
   */
  renderBlocks() {
    const {isLoading, data} = this.props.blocks;
    const divisions = this.props.divisions.data;

    const rows = divisions.map((divisionSearch) => {
      const divBlock = data.filter(({division}) => divisionSearch.id == division.id);
      return this.renderRow(divBlock, divisionSearch.name, divisionSearch.id);

    });

    return {
      isLoading: isLoading,
      rows: rows,
      eventKey: 5,
      title: 'Список блоков',
      canAdd: true,
      addTitle: 'Добавить блок',
    };
  }

  selectDivisions() {
    const {data} = this.props.divisions;
    return (
      <FormControl name="division_id" componentClass="select" placeholder="Подразделение ...">
        {data.map((division, index) => {
          return <option key={index} value={division.id}>{division.name}</option>
        })}
      </FormControl>
    )
  }

  render() {
    const {isLoading, rows, eventKey, title, canAdd = false, addTitle = 'Добавить'} = this.renderBlocks();
    return (
      <div>
        <h2>{title}</h2>

        {canAdd ?
          <Button style={{marginBottom: '10px'}} bsStyle="primary" onClick={this.handleAdd}>{addTitle}</Button> : null}
        {isLoading ? (
          <p>Идет загрузка...</p>
        ) : (
          <div>
            {rows}
          </div>
        )}


        <Modal show={this.state.showAddModal} onHide={this.closeAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить блок</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.sendFormAddModal}>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Введите имя</ControlLabel>
                <FormControl name="name" type="text" placeholder="Имя ..." required/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Выберете подразделение</ControlLabel>
                {this.selectDivisions()}
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
            <Modal.Title>Изменить блок</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.editBlock}>
            <Modal.Body>
              <FormGroup>
                <ControlLabel>Введите имя</ControlLabel>
                <FormControl defaultValue={this.state.editName} name="name" type="text" placeholder="Имя ..." required/>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Выберете подразделение</ControlLabel>
                {this.selectDivisions()}
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

Blocks.propTypes = {
  blocks: PropTypes.object.isRequired,
  loadBlocks: PropTypes.func.isRequired,
  deleteBlocks: PropTypes.func.isRequired,
  addBlocks: PropTypes.func.isRequired,
  updateBlocks: PropTypes.func.isRequired,
  divisions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {

  const {blocks, divisions} = state;

  return {blocks, divisions};
};

export default connect(mapStateToProps, {
  loadBlocks,
  deleteBlocks,
  addBlocks,
  updateBlocks
})(Blocks);
