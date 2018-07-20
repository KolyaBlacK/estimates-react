import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/lib/Button'
import Modal from 'react-bootstrap/lib/Modal'

class ModalConfirmation extends Component {
  constructor(props) {
    super(props);
    this.hide = this.hide.bind(this);
    this.checkTrue = this.checkTrue.bind(this);
  }

  hide() {
    this.props.onHideModal();
  }

  checkTrue() {
    this.props.action();
    this.hide();
  }

  render() {
    return (
      <Modal show={this.props.onShowModal} onHide={this.hide}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <p>{this.props.actionTitle}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hide}>Нет</Button>
          <Button onClick={this.checkTrue}>Да</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

ModalConfirmation.propTypes = {
  onShowModal: PropTypes.bool.isRequired,
  onHideModal: PropTypes.func.isRequired
};

export default ModalConfirmation
