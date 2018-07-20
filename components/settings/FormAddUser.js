import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Modal from 'react-bootstrap/lib/Modal'
import Checkbox from 'react-bootstrap/lib/Checkbox';

class FormAddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      role: 'manager',
      division: props.selectDivisions[0].id,
      active: true
    };

    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmitForm(e) {
    e.preventDefault();
    const {sendFormAddModal} = this.props;
    sendFormAddModal(this.state);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmitForm}>
        <Modal.Body>
          <FormGroup>
            <ControlLabel>Введите имя</ControlLabel>
            <FormControl value={this.state.name} onChange={this.handleInputChange} name="name" type="text"
                         placeholder="Имя" required/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Введите e-mail</ControlLabel>
            <FormControl value={this.state.email} onChange={this.handleInputChange} name="email" type="email"
                         placeholder="E-mail" required/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Введите пароль</ControlLabel>
            <FormControl value={this.state.password} onChange={this.handleInputChange} name="password" type="password"
                         placeholder="Пароль" required/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Повторите пароль</ControlLabel>
            <FormControl value={this.state.password_confirmation} onChange={this.handleInputChange}
                         name="password_confirmation" type="password" placeholder="Пароль" required/>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Роль пользователя</ControlLabel>
            <FormControl name="role" componentClass="select" onChange={this.handleInputChange} placeholder="Роль">
              <option value="admin">admin</option>
              <option value="director">director</option>
              <option value="manager">manager</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Выберете подразделение</ControlLabel>
            <FormControl name="division" componentClass="select" onChange={this.handleInputChange}
                         placeholder="Подразделение">
              {this.props.selectDivisions.map((division, index) => {
                return <option key={index} value={division.id}>{division.name}</option>
              })}
            </FormControl>

          </FormGroup>
          <Checkbox value={this.state.active} name="active" checked={this.state.active}
                    onChange={this.handleInputChange} inline>
            Пользователь активен
          </Checkbox>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Отмена</Button>
          <Button type="submit">Добавить</Button>
        </Modal.Footer>
      </Form>
    )
  }
}

FormAddUser.propTypes = {
  selectDivisions: PropTypes.array.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default FormAddUser
