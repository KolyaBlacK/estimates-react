import React, {Component} from 'react'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import LayoutSubTask from './LayoutSubTask'
import LayoutExpert from './LayoutExpert'

class BlockLvl4 extends Component {

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

    return (
      <div>
        <Row>
          <Col xs={11} className="pull-right">
            {block.type === 'subTask' || block.type === 'task' ?
              <LayoutSubTask
                block={block}
                lock={lock}
                hierarchy={hierarchy}
                showExpertModal={showExpertModal}
                showOptionModal={showOptionModal}
                editOptionBlock={editOptionBlock}
                editExpertBlock={editExpertBlock}
                removeBlock={removeBlock}
                collapseBlock={collapseBlock}
                BlockLayout={LayoutExpert}
              />
              :
              <LayoutExpert
                block={block}
                lock={lock}
                hierarchy={hierarchy}
                removeBlock={removeBlock}
                collapseBlock={collapseBlock}
                editExpertBlock={editExpertBlock}
              />
            }
          </Col>
        </Row>
      </div>
    )

  }

}

export default BlockLvl4;

