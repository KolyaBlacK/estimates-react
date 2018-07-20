import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'react-bootstrap-daterangepicker/css/daterangepicker.css';
import LeftStatistics from './LeftStatistics';
import SelectRateCard from './SelectRateCard';
import SelectLanguage from './SelectLanguage';
import SelectManager from './SelectManager';

import {
  loadActiveUsers,
  loadRateCards
} from '../../actions';

const DUMMY_LANGUAGES = [{
  value: 'en',
  name: 'English'
}, {
  value: 'ru',
  name: 'Русский'
}];

const loadData = (props) => {
  if (!props.ratecards.isLoading && props.ratecards.data.length === 0) {
    props.loadRateCards();
  }
  if (!props.users.isLoading && props.users.data.length === 0) {
    props.loadActiveUsers();
  }
};

const makeManagers = (managers) => {
  return managers.map(manager => manager.id);
}

class LeftForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      managers: props.managers.length > 0 ? makeManagers(props.managers) : [],
      ratecard: props.rate_card ? props.rate_card.id : 0,
      draftChecked: props.draft
    }

    this.handleClickUpdateRateCard = this.handleClickUpdateRateCard.bind(this);
  }

  componentWillMount() {
    const {change} = this.props;
    loadData(this.props);
    change({
      managers: this.state.managers,
      rate_card_id: this.state.ratecard
    });
  }

  onSubmit(e) {
    const {submit} = this.props;
    submit();
  }

  onChange(e) {
    const {name, value} = e.target;
    const {change} = this.props;
    change({[name]: value});
  }

  onDateRangeChange(e, picker) {
    const {change} = this.props;
    change({
      date_from: moment(picker.startDate).format("DD.MM.YYYY"),
      date_to: moment(picker.endDate).format("DD.MM.YYYY")
    });
  }

  onManagerChange(value) {
    const {change} = this.props;
    const array = this.state.managers.slice();
    const index = array.findIndex(manager => manager === value);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(value);
    }
    this.setState({managers: array});
    change({managers: array});
  }

  onRateChange(value) {
    const {change} = this.props;
    this.setState({ratecard: value});
    change({rate_card_id: value});
  }

  onDraftChange(e) {
    const {change} = this.props;
    this.setState({draftChecked: !this.state.draftChecked});

    setTimeout(() => change({draft: this.state.draftChecked}), 0)
  }

  handleClickUpdateRateCard() {
    this.props.handleEstimateUpdatePrice();
  }

  render() {

    const {
      isLoading,
      brand,
      name,
      sys_name,
      date_from,
      date_to,
      lang,
      created_at,
      updated_at,
      experts,
      users,
      ratecards,
      rate_card_updated
    } = this.props;

    const locale = {
      format: 'DD/MM/YYYY',
    };

    return (

      <Form>
        <FormGroup>
          <ControlLabel>Клиент:</ControlLabel>
          <FormControl
            type="text"
            name="brand"
            value={brand}
            placeholder="Введите текст"
            onChange={this.onChange.bind(this)}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Название проекта:</ControlLabel>
          <FormControl
            type="text"
            name="name"
            value={name}
            placeholder="Введите текст"
            onChange={this.onChange.bind(this)}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Название проекта для клиента:</ControlLabel>
          <FormControl
            type="text"
            name="sys_name"
            value={sys_name}
            placeholder="Введите текст"
            onChange={this.onChange.bind(this)}
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Период сметы:</ControlLabel>
          <DateRangePicker
            startDate={date_from}
            endDate={date_to}
            locale={locale}
            onApply={this.onDateRangeChange.bind(this)}>
            <FormControl
              type="text"
              name="date_range"
              placeholder="Введите текст"
            />
          </DateRangePicker>
        </FormGroup>
        {created_at ? <p><b>Дата создания: </b>{created_at}</p> : null}
        {updated_at ? <p><b>Дата обновления: </b>{updated_at}</p> : null}
        <hr/>
        <SelectManager
          change={this.onManagerChange.bind(this)}
          selected={this.state.managers}
          users={users}
        />
        <SelectRateCard
          change={this.onRateChange.bind(this)}
          ratecards={ratecards}
          value={this.state.ratecard}
        />
        {rate_card_updated ?
          <Button onClick={this.handleClickUpdateRateCard}>
            Обновить рейткарту
          </Button>
          : null
        }

        <SelectLanguage
          change={this.onChange.bind(this)}
          data={DUMMY_LANGUAGES}
          value={lang}
        />
        <hr/>
        <LeftStatistics
          experts={experts}
        />

        <Checkbox name="draft" onChange={this.onDraftChange.bind(this)} value={this.state.draftChecked}
                  checked={this.state.draftChecked} inline>
          Сохранить как черновик
        </Checkbox>
        <hr/>
        <ButtonToolbar>
          <Button
            bsStyle="success"
            onClick={this.onSubmit.bind(this)}
            disabled={isLoading || ratecards.isLoading || users.isLoading}
          >Сохранить</Button>
          {!this.props.noExport ?
            <a className="btn btn-primary" href={`/export/excel-estimate/${this.props.id}/`}>Экспорт</a> : null}

        </ButtonToolbar>
      </Form>
    );

  }

}

LeftForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  brand: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sys_name: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  managers: PropTypes.array.isRequired,
  created: PropTypes.string,
  updated: PropTypes.string
};

const mapStateToProps = (state) => {

  const {users, ratecards} = state;

  return {
    users,
    ratecards
  };

};

export default connect(mapStateToProps, {
  loadActiveUsers,
  loadRateCards,
})(LeftForm);
