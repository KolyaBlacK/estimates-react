import React, {Component} from 'react'
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import NumberFormat from 'react-number-format';

class ExpertLayout extends Component {

  constructor(props) {
    super(props);

    this.editExpertBlock = props.editExpertBlock;
    this.removeBlock = props.removeBlock;
    this.copyBlock = props.copyBlock;
    this.collapseBlock = props.collapseBlock;
  }

  headerDoubleClick(e) {
    e.preventDefault();
    const {target} = e;
    if (target.classList.contains('panel-heading')) {
      this.editExpertBlock([...this.props.hierarchy, this.props.block.unique_id]);
    }
  }

  removeClick(e) {
    e.preventDefault();
    this.removeBlock([...this.props.hierarchy, this.props.block.unique_id]);
  }

  collapseClick(e) {
    e.preventDefault();
    this.collapseBlock(this.props.block);
  }

  render() {

    const {
      block,
      lock
    } = this.props;

    return (
      <div>
        <div className="panel panel-warning">
          <div className="panel-heading clearfix" style={{userSelect: 'none'}}
               onDoubleClick={this.headerDoubleClick.bind(this)}>
            {block.name}
            {block.division_info ? ` (${block.division_info.name})` : null}
            <button className="pull-right" style={{width: "25px", marginTop: "-2px"}}
                    onClick={this.collapseClick.bind(this)}>{!this.props.block.collapsed ? '−' : '+'}</button>
            <Button bsStyle="danger" className="pull-right" style={{marginTop: "-4px", marginRight: "10px"}}
                    onClick={this.removeClick.bind(this)} disabled={lock}>Удалить эксперта</Button>
          </div>
          {!this.props.block.collapsed
            ?
            <div className="panel-body">
              <div className="row">
                <Col xs={3}>
                  <p>Ставка <strong>{block.data.amount}</strong></p>
                </Col>
                {block.data.months > 1
                  ?
                  <Col xs={3}>
                    <p>часов в месяце <strong>{block.data.hours_in_month}</strong></p>
                  </Col>
                  :
                  null
                }
                {block.data.months > 1
                  ?
                  <Col xs={3}>
                    <p>Кол-во месяцев <strong>{block.data.months}</strong></p>
                  </Col>
                  :
                  null
                }
                <Col xs={3}>
                  <p>Кол-во часов <strong>{block.data.hours}</strong></p>
                </Col>
                <Col xs={3}>
                  <p>Сумма <strong>
                    <NumberFormat value={block.data.sum} displayType={'text'} thousandSeparator={true}/>
                  </strong>
                  </p>
                </Col>
              </div>
            </div>
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default ExpertLayout;
