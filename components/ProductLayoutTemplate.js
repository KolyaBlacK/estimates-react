import React, {Component} from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import BlockLvl1 from './estimate/BlockLvl1';

class ProductLayout extends Component {
  constructor(props) {
    super(props);
    this.showOptionModal = props.showOptionModal;
    this.removeBlock = props.removeBlock;
    this.createInvisibleBlock = props.createInvisibleBlock;
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
      lock
    } = this.props;

    return (
      <div>
        <Row>
          <Col xs={12}>
            {blocks ? blocks.map((block, index) => {
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
