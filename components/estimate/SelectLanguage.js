import React, {Component} from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class LanguageSelect extends Component {

  render() {

    const {data, value, change} = this.props;

    return (
      <FormGroup>
        <ControlLabel>Язык:</ControlLabel>
        <FormControl
          name="lang"
          componentClass="select"
          placeholder="select"
          value={value}
          onChange={change}>
          {data.map((lang, index) => (
            <option value={lang.value} key={index}>{lang.name}</option>
          ))}
        </FormControl>
      </FormGroup>
    );

  }

}

export default LanguageSelect;
