import React, {Component} from 'react'
import BlockLvl3 from './BlockLvl3';
import LayoutBlock from './LayoutBlock'
import LayoutInvisibleBlock from './LayoutInvisibleBlock'

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

class BlockLvl2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: total(props.block.blocks)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      sum: total(nextProps.block.blocks)
    })
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
      copyBlock,
      collapseBlock,
      moveBlock,
      lock
    } = this.props;

    return (
      <div>
        {this.state.sum > 0 ? (
          <div>
            Сумма: {this.state.sum}
          </div>
        ) : null}

        {block.type === 'invisible' ?
          <LayoutInvisibleBlock
            block={block}
            lock={lock}
            hierarchy={hierarchy}
            showExpertModal={showExpertModal}
            showOptionModal={showOptionModal}
            editOptionBlock={editOptionBlock}
            editExpertBlock={editExpertBlock}
            removeBlock={removeBlock}
            copyBlock={copyBlock}
            moveBlock={moveBlock}
            collapseBlock={collapseBlock}
          />
          :
          <LayoutBlock
            block={block}
            lock={lock}
            hierarchy={hierarchy}
            showExpertModal={showExpertModal}
            showOptionModal={showOptionModal}
            editOptionBlock={editOptionBlock}
            editExpertBlock={editExpertBlock}
            removeBlock={removeBlock}
            copyBlock={copyBlock}
            moveBlock={moveBlock}
            collapseBlock={collapseBlock}
            BlockLayout={BlockLvl3}
          />
        }
      </div>
    )
  }
}

export default BlockLvl2;
