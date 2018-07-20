import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

class ModalError extends Component {
  constructor(props) {
    super(props);
    this.hide = this.hide.bind(this);
  }

  hide() {
    this.props.onHideModal();
  }

  render() {
    return (
      <Modal show={this.props.onShowModal} onHide={this.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Ошибка</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {this.props.errors ? Object.keys(this.props.errors).map(key => {
              return (
                <li key={key}>{this.props.errors[key][0]}</li>
              )
            }) : null}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hide}>Ok</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

ModalError.propTypes = {
  onShowModal: PropTypes.bool.isRequired,
  onHideModal: PropTypes.func.isRequired
};

export default ModalError
