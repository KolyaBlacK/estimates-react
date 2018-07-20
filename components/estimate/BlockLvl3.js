import React, {Component} from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import BlockLvl4 from './BlockLvl4';
import LayoutTask from './LayoutTask'
import LayoutSubTask from './LayoutSubTask'
import LayoutExpert from './LayoutExpert'

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
      sum: props.block.blocks ? total(props.block.blocks) : 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.block.blocks) {
      this.setState({
        sum: total(nextProps.block.blocks)
      })
    }
  }

  render() {

    const {
      block,
      hierarchy,
      showExpertModal,
      showOptionModal,
      editOptionBlock,
      editExpertBlock,
      removeBlock,
      collapseBlock,
      lock
    } = this.props;

    const layouts = {
      'task': LayoutTask,
      'subTask': LayoutSubTask,
      'expert': LayoutExpert
    }

    const BlockLayout = layouts[block.type];

    return (
      <div>
        <Row>
          <Col xs={11} className="pull-right">

            {this.state.sum > 0 ? (
              <div>
                Сумма: {this.state.sum}
              </div>
            ) : null}
            {block.type !== 'block' ?
              <BlockLayout
                block={block}
                lock={lock}
                hierarchy={hierarchy}
                showExpertModal={showExpertModal}
                showOptionModal={showOptionModal}
                editOptionBlock={editOptionBlock}
                editExpertBlock={editExpertBlock}
                removeBlock={removeBlock}
                collapseBlock={collapseBlock}
                BlockLayout={BlockLvl4}
              />
              :
              null
            }
          </Col>
        </Row>
      </div>
    )

  }

}

export default ProductLayout;
