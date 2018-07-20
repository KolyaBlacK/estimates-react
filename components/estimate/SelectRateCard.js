import React, {Component} from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class RateCardSelect extends Component {

  componentDidUpdate() {
    const {value, ratecards, change} = this.props;
    if (!ratecards.isLoading && ratecards.data.length > 0 && value === 0) {
      change(ratecards.data[0].id);
    }
  }

  onChange(e) {
    const {change} = this.props;
    change(parseInt(e.target.value, 10));
  }

  render() {

    const {value, ratecards} = this.props;

    return (
      <FormGroup>
        <ControlLabel>Рейткарта:</ControlLabel>
        {ratecards.isLoading || ratecards.data.length <= 0 ? (
          <p>Идет загрузка...</p>
        ) : (
          <FormControl
            name="rate_card_id"
            componentClass="select"
            placeholder="select"
            value={value}
            onChange={this.onChange.bind(this)}>
            {ratecards.data.map((card, index) => (
              <option value={card.id} key={index}>{card.name}</option>
            ))}
          </FormControl>
        )}
      </FormGroup>
    );
  }
}

export default RateCardSelect;
