import React, {Component} from 'react'
import Button from 'react-bootstrap/lib/Button'

class LayoutSubBlock extends Component {

  constructor(props) {
    super(props);

    this.showOptionModal = props.showOptionModal;
    this.editOptionBlock = props.editOptionBlock;
    this.removeBlock = props.removeBlock;
    this.copyBlock = props.copyBlock;
    this.collapseBlock = props.collapseBlock;
  }

  addTaskClick(e) {
    e.preventDefault();
    this.showOptionModal('task', [...this.props.hierarchy, this.props.block.unique_id]);
  }

  headerDoubleClick(e) {
    e.preventDefault();
    const {target} = e;
    if (target.classList.contains('panel-heading')) {
      this.editOptionBlock([...this.props.hierarchy, this.props.block.unique_id]);
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
      hierarchy,
      showExpertModal,
      showOptionModal,
      editOptionBlock,
      editExpertBlock,
      removeBlock,
      collapseBlock,
      BlockLayout,
      lock
    } = this.props;

    return (
      <div className="panel panel-default">
        <div className="panel-heading clearfix" style={{userSelect: 'none'}}
             onDoubleClick={this.headerDoubleClick.bind(this)}>
          {block.name}
          <button className="pull-right" style={{width: "25px", marginTop: "-2px"}}
                  onClick={this.collapseClick.bind(this)}>{!this.props.block.collapsed ? '−' : '+'}</button>
          <Button bsStyle="danger" className="pull-right" style={{marginTop: "-4px", marginRight: "10px"}}
                  onClick={this.removeClick.bind(this)} disabled={lock}>Удалить подблок</Button>
        </div>
        {!this.props.block.collapsed
          ?
          <div>
            <div className="panel-body">
              {block.blocks && block.blocks.map((subBlock, index) => <BlockLayout
                key={index}
                block={subBlock}
                lock={lock}
                hierarchy={[...hierarchy, block.unique_id]}
                showExpertModal={showExpertModal}
                showOptionModal={showOptionModal}
                editOptionBlock={editOptionBlock}
                editExpertBlock={editExpertBlock}
                removeBlock={removeBlock}
                collapseBlock={collapseBlock}
              />)}
            </div>
            <div className="panel-footer">
              <Button bsStyle="info" onClick={this.addTaskClick.bind(this)} disabled={lock}>Добавить задачу</Button>
            </div>
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default LayoutSubBlock;

