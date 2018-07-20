import React, {Component} from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Button from 'react-bootstrap/lib/Button'
import Toggle from 'react-bootstrap-toggle';

class ModalOption extends Component {

  constructor(props) {
    super(props);
    this.state = {
      adv: props.edit && !props.id ? true : false
    }
    this.newOptionModal = props.newOptionModal;
    this.updateOptionModal = props.updateOptionModal;

    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const select = this.state.adv ? e.target.block_type : null;
    const id = this.state.adv ? select.value : null;
    const name = this.state.adv ? select.options[select.selectedIndex].innerHTML : e.target.block_custom_name.value;
    if (this.props.edit) {
      this.updateOptionModal(id, name);
    } else {
      this.newOptionModal(id, name);
    }

    this.setState({
      adv: false
    })
  }

  onToggle() {
    const current = this.state.adv;
    this.setState({
      adv: !current
    });
  }

  onCloseModal() {
    this.props.closeOptionModal();
    this.setState({
      adv: false
    })
  }

  render() {

    const {
      id,
      name,
      options,
      mainTitle,
      title,
      showOptionModal
    } = this.props;

    return (
      <div>
        <Modal show={showOptionModal} onHide={this.onCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{mainTitle}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.onSubmit.bind(this)}>
            <Modal.Body>
              <Row>
                <Col xs={9}>
                  <FormGroup>
                    <ControlLabel>{title}</ControlLabel><br/>
                    {this.state.adv ? (
                      <div>
                        {options.isLoading ? (
                          <p>Идет загрузка...</p>
                        ) : (
                          <FormControl
                            id="block_type"
                            name="block_type"
                            componentClass="select"
                            defaultValue={id}
                            placeholder="select">
                            {options.data.map((option, index) => <option value={option.id}
                                                                         key={index}>{option.name}</option>)}
                          </FormControl>
                        )}
                      </div>
                    ) : (
                      <FormControl
                        id="block_custom_name"
                        name="block_custom_name"
                        defaultValue={name}>
                      </FormControl>
                    )}
                  </FormGroup>
                </Col>
                <Col xs={1}>
                  <ControlLabel>Расширенные</ControlLabel>
                  <FormGroup>
                    <Toggle
                      on="ON"
                      off="OFF"
                      active={this.state.adv}
                      width={75}
                      height={30}
                      onClick={this.onToggle.bind(this)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.onCloseModal}>Отмена</Button>
              <Button type="submit">Применить</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default ModalOption;
