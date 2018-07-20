import React, {Component} from 'react';
import NumberFormat from 'react-number-format';
import Table from 'react-bootstrap/lib/Table';
import 'lodash'

class LeftStatistics extends Component {
  constructor(props) {
    super(props)

    const {experts} = this.props;
    this.state = {
      experts
    }
  }

  componentWillReceiveProps(nextProps) {
    const experts = nextProps.experts.slice();
    this.setState({
      experts
    });
  }

  render() {
    const {experts} = this.state;
    const outputDivisions = _(experts)
      .groupBy('division_info.id')
      .reduce(function (array, children, key) {
        array.push({
          division: children[0].division_info,
          experts: children
        });

        return array;
      }, []);

    const outputExperts = outputDivisions.map((division) => {
      division.experts = _(division.experts)
        .groupBy('name')
        .map((objs, key) => ({
          'name': key,
          'hours': _.sumBy(objs, 'data.hours'),
          'sum': _.sumBy(objs, 'data.sum')
        }))
        .value();
      return division
    })

    const total = experts.reduce((acc, expert) => acc + expert.data.sum, 0);
    const nds = total * .18;
    const totalNDS = total * 1.18;

    if (this.state.experts.length > 0) {

      return (
        <div>
          <p><b>Статистика:</b></p>
          {outputExperts.map((division, index) => {
            return (
              <div key={index}>
                <b>
                  {division.division ? division.division.name : 'no division'}
                </b>
                <Table>
                  <tbody>
                  {division.experts.map((expert, index) => {
                    return (
                      <tr key={index}>
                        <td style={{width: "50%"}}>{expert.name}</td>
                        <td style={{width: "15%"}}>{expert.hours}ч</td>
                        <td style={{width: "35%"}}><NumberFormat value={expert.sum.toFixed(2)} displayType={'text'}
                                                                 thousandSeparator={true}/> руб
                        </td>
                      </tr>
                    )
                  })}
                  </tbody>
                </Table>
              </div>
            )
          })}
          <Table>
            <thead>
            <tr>
              <th colSpan={2}>
                Итого
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td style={{width: "65%"}}>Итого (без НДС)</td>
              <td style={{width: "35%"}}><NumberFormat value={total.toFixed(2)} displayType={'text'}
                                                       thousandSeparator={true}/> руб
              </td>
            </tr>
            <tr>
              <td style={{width: "65%"}}>НДС</td>
              <td style={{width: "35%"}}><NumberFormat value={nds.toFixed(2)} displayType={'text'}
                                                       thousandSeparator={true}/> руб
              </td>
            </tr>
            <tr>
              <td style={{width: "65%"}}>Итого (с НДС)</td>
              <td style={{width: "35%"}}><NumberFormat value={totalNDS.toFixed(2)} displayType={'text'}
                                                       thousandSeparator={true}/> руб
              </td>
            </tr>
            </tbody>
          </Table>
        </div>
      );
    } else {
      return (
        null
      );
    }
  }
}

export default LeftStatistics;
