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

class ModalExpert extends Component {

  constructor(props) {
    super(props);
    this.state = {
      adv: props.edit && (expertData && expertData.months) ? true : false,
      advCustom: false
    }
    this.newExpertModal = props.newExpertModal;
    this.updateExpertModal = props.updateExpertModal;

    this.onCloseModal = this.onCloseModal.bind(this);
  }


  onToggle() {
    const currentAdv = this.state.adv;
    this.setState({
      adv: !currentAdv,
      advCustom: false
    });
  }

  onToggleCustom() {
    const currentAdvCustom = this.state.advCustom;
    this.setState({
      advCustom: !currentAdvCustom,
      adv: false
    });
  }

  onCloseModal() {
    this.props.closeExpertModal();
    this.setState({
      adv: false,
      advCustom: false
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const select = form.expert;
    const selected = this.state.advCustom ? null : select[select.selectedIndex];

    const division = !this.state.advCustom ?
      this.props.options.filter(({id}) => id === Number(selected.value))[0].division
      : null;

    const dataRate = this.state.advCustom ? parseFloat(form.amount.value) : parseFloat(selected.getAttribute('data-rate'));
    const dataHours = this.state.adv ? parseFloat(form.hours_in_months.value) : parseFloat(form.expert_hours.value);
    const dataMonth = this.state.adv ? parseFloat(form.expert_months.value) : null;

    const data = {
      rate_card_expert_id: this.state.advCustom ? null : select.value,
      amount: dataRate,
      hours: this.state.adv ? dataHours * dataMonth : dataHours,
      months: this.state.adv ? dataMonth : null,
      hours_in_month: this.state.adv ? dataHours : null,
      sum: this.state.adv ? (dataHours * dataMonth) * dataRate : dataRate * dataHours
    }

    if (this.props.edit) {
      if (this.state.advCustom) {
        this.updateExpertModal(null, select.value, data);
      } else {
        this.updateExpertModal(select.value, selected.getAttribute('data-name'), data);
      }
    } else {
      if (this.state.advCustom) {
        this.newExpertModal(null, select.value, data);
      } else {
        this.newExpertModal(select.value, selected.getAttribute('data-name'), data, division);
      }
    }

    this.setState({
      adv: false,
      advCustom: false
    })
  }

  render() {

    const {
      id,
      options,
      expertData,
      showExpertModal,
    } = this.props;
    return (
      <div>
        <Modal show={showExpertModal} onHide={this.onCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Выберите специалиста</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.onSubmit.bind(this)}>
            <Modal.Body>
              <Row>
                <Col xs={9}>

                  <FormGroup>
                    <ControlLabel>Эксперт</ControlLabel>
                    {!this.state.advCustom ?
                      <div>
                        {(options.length > 0
                            ?
                            <FormControl
                              name="expert"
                              componentClass="select"
                              defaultValue={id || options[0].id}
                              placeholder="select">
                              {options.map((option, index) => <option value={option.id}
                                                                      data-name={option.expert.name.en}
                                                                      data-rate={option.amount}
                                                                      key={index}>{option.expert.name.en} ({option.division.name})</option>)}
                            </FormControl>
                            :
                            <p>Эксперты недоступны</p>
                        )} </div>
                      :
                      <FormControl
                        name="expert"
                        type="text"
                        placeholder="Имя ...">
                      </FormControl>
                    }
                  </FormGroup>

                  {!this.state.adv ?
                    <FormGroup>
                      <ControlLabel>Количество часов</ControlLabel>
                      <FormControl name="expert_hours" type="number" pattern="\d+"
                                   defaultValue={expertData ? expertData.hours : 1}/>
                    </FormGroup> : null}

                  {this.state.adv ?
                    <FormGroup>
                      <ControlLabel>Кол-во часов в месяце</ControlLabel>
                      <FormControl name="hours_in_months" type="number" pattern="\d+"
                                   defaultValue={expertData && (expertData.months > 0) ? expertData.months : 1}/>
                    </FormGroup> : null}

                  {this.state.adv ?
                    <FormGroup>
                      <ControlLabel>Кол-во месяцев</ControlLabel>
                      <FormControl name="expert_months" type="number" pattern="\d+"
                                   defaultValue={expertData && (expertData.months > 0) ? expertData.months : 1}/>
                    </FormGroup> : null}

                  {this.state.advCustom ?
                    <FormGroup>
                      <ControlLabel>Стоимость</ControlLabel>
                      <FormControl name="amount" type="number" pattern="\d+"/>
                    </FormGroup> : null}
                </Col>
                <Col xs={1}>
                  <FormGroup>
                    <ControlLabel>Расширенные</ControlLabel>
                    <Toggle
                      on="ON"
                      off="OFF"
                      active={this.state.adv}
                      width={75}
                      height={30}
                      onClick={this.onToggle.bind(this)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <ControlLabel>Custom</ControlLabel>
                    <Toggle
                      on="ON"
                      off="OFF"
                      active={this.state.advCustom}
                      width={75}
                      height={30}
                      onClick={this.onToggleCustom.bind(this)}
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

export default ModalExpert;
