import React, {Component} from 'react'

import LayoutBlockTask from './LayoutBlockTask'
import BlockLvl3 from './BlockLvl3';

class LayoutInvisibleBlock extends Component {

  constructor(props) {
    super(props);

    this.moveBlock = props.moveBlock;
  }

  headerMouseDown(e) {
    const {target} = e;
    if (target.classList.contains('panel-heading')) {
      const div = this.refs.blockRow;
      const elements = div.parentElement.parentElement.childNodes;
      this.moveBlock([this.props.block.unique_id], elements, e.clientY);
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
      copyBlock,
      collapseBlock,
      lock
    } = this.props;

    const zIndex = Math.abs(block.transform) > 0 ? 10 : 0;

    return (
      <div ref="blockRow" style={{position: 'relative', transform: `translateY(${block.transform}px)`, zIndex}}
           onMouseDown={this.headerMouseDown.bind(this)}>
        {block.blocks && block.blocks.map((subBlock, index) => <LayoutBlockTask
            key={index}
            block={subBlock}
            lock={lock}
            hierarchy={hierarchy}
            showExpertModal={showExpertModal}
            showOptionModal={showOptionModal}
            editOptionBlock={editOptionBlock}
            editExpertBlock={editExpertBlock}
            removeBlock={removeBlock}
            copyBlock={copyBlock}
            collapseBlock={collapseBlock}
            BlockLayout={BlockLvl3}
          />
        )}
      </div>
    )

  }

}

export default LayoutInvisibleBlock;
