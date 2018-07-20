import React, {Component} from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import Toggle from 'react-bootstrap-toggle';
import BlockLvl1 from './estimate/BlockLvl1';

function total(blocks) {
  return blocks.reduce((sum, block) => {
    if (block.type === 'expert') {
      sum += block.data.sum;
    }
    if (block.blocks) {
      sum += total(block.blocks);
    }

    return sum;
  }, 0);
}

class ProductLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lock: props.lock || false,
      totalSum: total(props.blocks)
    };
    this.showOptionModal = props.showOptionModal;
    this.removeBlock = props.removeBlock;
    this.createInvisibleBlock = props.createInvisibleBlock;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalSum: total(nextProps.blocks)
    })
  }

  addBlockClick(e) {
    e.preventDefault();
    this.showOptionModal('block');
  }

  addTaskClick(e) {
    e.preventDefault();
    const unique_id = this.createInvisibleBlock();
    this.showOptionModal('blockTask', [unique_id]);
  }

  onToggleLock() {
    const {lockAction} = this.props;
    const currentLock = this.state.lock;
    this.setState({
      lock: !currentLock,
    });

    setTimeout(() => {
      lockAction(this.state.lock);
    }, 0)
  }

  render() {
    const {
      blocks,
      showExpertModal,
      showOptionModal,
      editOptionBlock,
      editExpertBlock,
      removeBlock,
      copyBlock,
      collapseBlock,
      moveBlock,
      lockPermission,
      lock
    } = this.props;

    return (
      <div>
        {this.state.totalSum > 0 ? (
          <div>
            Общая сумма: {this.state.totalSum}
          </div>
        ) : null}

        <Toggle
          on="Lock"
          off="Unlock"
          active={this.state.lock}
          width={75}
          height={30}
          onClick={this.onToggleLock.bind(this)}
          disabled={lockPermission === false}
          className="pull-right"
        />
        <Row>
          <Col xs={12}>
            {blocks.length > 0 ? blocks.map((block, index) => {

              return (
                <BlockLvl1
                  key={index}
                  hierarchy={[block.unique_id]}
                  position={index}
                  block={block}
                  lock={lock}
                  showExpertModal={showExpertModal}
                  showOptionModal={showOptionModal}
                  editOptionBlock={editOptionBlock}
                  editExpertBlock={editExpertBlock}
                  removeBlock={removeBlock}
                  copyBlock={copyBlock}
                  collapseBlock={collapseBlock}
                  moveBlock={moveBlock}
                />
              )
            }) : null}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Button bsStyle="primary" style={{marginRight: "10px"}} onClick={this.addBlockClick.bind(this)}
                    disabled={lock}>Добавить блок</Button>
            <Button bsStyle="info" onClick={this.addTaskClick.bind(this)} disabled={lock}>Добавить задачу</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ProductLayout;
