import React, {Component} from 'react';
import Modal from 'react-bootstrap/lib/Modal'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Form from 'react-bootstrap/lib/Form'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Button from 'react-bootstrap/lib/Button'

class ModalTab extends Component {
  constructor(props) {
    super(props);

    const templateId = props.productions.data[0].template;
    const productionId = props.productions.data[0].id;
    this.state = {
      adv: false,
      showTemplateControl: templateId,
      toggleTemplate: false,
      productionId: productionId
    };

    this.changeSelect = this.changeSelect.bind(this);
    this.onToggleTemplate = this.onToggleTemplate.bind(this);
  }

  submitNewTab(e) {
    e.preventDefault();
    const {newTabModal, productions} = this.props;
    const id = parseInt(e.target.name.value);
    const experts = productions.data.find(currentProduction => currentProduction.id === id)['available-experts'];
    newTabModal(e.target, experts, this.state.adv, this.state.showTemplateControl > 0 && this.state.toggleTemplate ? this.state.productionId : false);
  }

  onToggle() {
    const current = this.state.adv;
    this.setState({
      adv: !current
    });
  }

  onToggleTemplate() {
    const current = this.state.toggleTemplate;
    this.setState({
      toggleTemplate: !current
    });
  }

  changeSelect(event) {
    const templateId = Number(event.target[event.target.selectedIndex].getAttribute('data-template-id'));
    const productionId = Number(event.target[event.target.selectedIndex].value);
    this.setState({
      showTemplateControl: templateId,
      productionId: productionId
    });

  }

  render() {

    const {
      productions,
      divisions,
      showTabModal,
      closeTabModal,
    } = this.props;

    return (
      <div>
        <Modal show={showTabModal} onHide={closeTabModal}>
          <Modal.Header closeButton>
            <Modal.Title>Введите название</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.submitNewTab.bind(this)}>
            <Modal.Body>
              <Row>
                <Col xs={9}>
                  <FormGroup>
                    <ControlLabel>Название</ControlLabel>
                    {!this.state.adv ? (
                      <div>
                        {productions.isLoading ? (
                          <p>Идет загрузка...</p>
                        ) : (
                          <FormControl
                            onChange={this.changeSelect}
                            name="name"
                            componentClass="select"
                            placeholder="select">
                            {productions.data.map((production, index) => <option data-template-id={production.template}
                                                                                 value={production.id}
                                                                                 key={index}>{production.name}</option>)}
                          </FormControl>
                        )}
                      </div>
                    ) : (
                      <FormControl
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Продукт ...">
                      </FormControl>
                    )}
                  </FormGroup>
                  {this.state.adv ? (
                    <FormGroup>
                      <ControlLabel>Подразделение</ControlLabel>
                      {divisions.isLoading ? (
                        <p>Идет загрузка...</p>
                      ) : (
                        <FormControl
                          name="subDivision"
                          componentClass="select"
                          placeholder="select">
                          {divisions.data.map((dept, index) => <option value={dept.id}
                                                                       key={index}>{dept.name}</option>)}
                        </FormControl>
                      )}
                    </FormGroup>
                  ) : (
                    null
                  )}
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={closeTabModal}>Отмена</Button>
              <Button type="submit">Применить</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default ModalTab;
