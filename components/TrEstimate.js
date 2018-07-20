import React, {Component} from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import Button from 'react-bootstrap/lib/Button'
import NumberFormat from 'react-number-format';
import {Link} from 'react-router'

class TrEstimate extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleExperts = this.handleExperts.bind(this);
  }

  handleClick() {
    this.props.onShowModal(this.props.id);
  }

  handleExperts() {
    this.props.onShowExpertsModal(this.props.id, this.props.experts);
  }

  render() {
    const total = this.props.amount;
    const totalNDS = total * 1.18;
    return (
      <tr>
        <th className={!this.props.noBtns ? "left-col" : null}>
          <ButtonToolbar className="table-toolbar">
            <a className="btn btn-primary" href={`/export/excel-estimate/${this.props.id}/`}>Экспорт</a>
            {this.props.actions.update ?
              <Link className="btn btn-primary" to={`/estimate/edit/${this.props.id}`}>Редактировать</Link> : null}
            <Button bsStyle="primary" onClick={this.handleClick}>Архивировать</Button>
          </ButtonToolbar>
        </th>
        <td>
          <div className="td-title">
            {this.props.name}
          </div>
        </td>
        <td className="nowrap">
          <NumberFormat value={this.props.amount.toFixed(2)} displayType={'text'} thousandSeparator={true}/>
        </td>
        <td className="nowrap">
          <NumberFormat value={totalNDS.toFixed(2)} displayType={'text'} thousandSeparator={true}/>
        </td>
        <td className="nowrap">
          {this.props.created_at}
        </td>
        <td className="nowrap">
          {this.props.updated_at}
        </td>
        <td>
          {this.props.rate_card.name}
        </td>
        {!this.props.noExperts ? (
          <td className="last-td specialists">
            <div className="wrap-specialists">
              {
                this.props.experts.map((expert, index) => {
                  return (
                    <div className="specialists-item" key={index}>
                      <div><b>{expert.rate_card_expert ? expert.rate_card_expert.expert.name.en : expert.name}</b></div>
                      <div>{expert.hours} | {expert.sum}</div>
                    </div>

                  )
                })
              }
            </div>
          </td>
        ) : null}

      </tr>
    )
  }
}

export default TrEstimate
