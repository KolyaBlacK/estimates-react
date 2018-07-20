import React, {Component} from 'react';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import {Link} from 'react-router'

class TrEstimateArchive extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onShowModal(this.props.id);
  }

  render() {
    return (
      <tr>
        <th>
          <ButtonToolbar className="table-toolbar">
            <a className="btn btn-primary" href={`/export/excel-estimate/${this.props.id}/`}>Экспорт</a>
            {this.props.actions.update ? <Link className="btn btn-primary"
                                               to={`/estimate/draft/edit/${this.props.id}`}>Редактировать</Link> : null}
          </ButtonToolbar>
        </th>
        <td>
          <div className="td-title">
            {this.props.name}
          </div>
        </td>
        <td className="nowrap">
          {this.props.amount}
        </td>
        <td className="nowrap">
          {this.props.amount}
        </td>
        <td className="nowrap">
          {this.props.date_from}
        </td>
        <td className="nowrap">
          {this.props.date_to}
        </td>
        <td>
          {this.props.rate_card.name}
        </td>
      </tr>
    )
  }
}

export default TrEstimateArchive
