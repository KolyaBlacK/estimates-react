import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormControl from 'react-bootstrap/lib/FormControl'

class SelectRateCards extends Component {
  constructor(props) {
    super(props);

    const {experts, activeExpert} = props;

    this.state = {
      experts,
      selected: activeExpert
    }

    this.handeleChange = this.handeleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      experts: nextProps.experts,
      selected: nextProps.activeExpert
    });
  }

  handeleChange(e) {
    const divisionId = this.props.idInArray;
    const expertValue = Number(e.target.value);
    this.props.changeFormControl(divisionId, expertValue);
    this.setState({
      selected: expertValue
    })
  }

  render() {
    const {experts, selected} = this.state;
    const {index} = this.props;

    return (
      <FormControl value={selected} name={`data[${index}][expert_id]`} onChange={this.handeleChange}
                   componentClass="select" placeholder="Эксперт ...">
        {experts.map((expert, index) => {
          return <option key={index} value={expert.id}>{expert.name.en}</option>
        })}
      </FormControl>
    )
  }
}

SelectRateCards.propTypes = {
  experts: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  changeFormControl: PropTypes.func.isRequired,
  idInArray: PropTypes.number.isRequired,
  activeExpert: PropTypes.number.isRequired
}

export default SelectRateCards;
