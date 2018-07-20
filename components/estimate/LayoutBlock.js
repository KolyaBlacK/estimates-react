import React, {Component} from 'react'
import Button from 'react-bootstrap/lib/Button'
import BlockLvl2 from './BlockLvl2';

class LayoutBlock extends Component {

  constructor(props) {
    super(props);

    this.showOptionModal = props.showOptionModal;
    this.editOptionBlock = props.editOptionBlock;
    this.removeBlock = props.removeBlock;
    this.copyBlock = props.copyBlock;
    this.moveBlock = props.moveBlock;
    this.collapseBlock = props.collapseBlock;
  }

  addSubBlockClick(e) {
    e.preventDefault();
    this.showOptionModal('sub', [this.props.block.unique_id]);
  }

  addTaskClick(e) {
    e.preventDefault();
    this.showOptionModal('task', [this.props.block.unique_id]);
  }

  headerDoubleClick(e) {
    e.preventDefault();
    const {target} = e;
    if (target.classList.contains('panel-heading')) {
      this.editOptionBlock([this.props.block.unique_id]);
    }
  }

  removeClick(e) {
    e.preventDefault();
    this.removeBlock([this.props.block.unique_id]);
  }

  copyClick(e) {
    e.preventDefault();
    this.copyBlock([this.props.block.unique_id]);
  }

  collapseClick(e) {
    e.preventDefault();
    this.collapseBlock(this.props.block);
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
      showExpertModal,
      showOptionModal,
      editOptionBlock,
      editExpertBlock,
      removeBlock,
      collapseBlock,
      lock
    } = this.props;
    const zIndex = Math.abs(block.transform) > 0 ? 10 : 0;

    return (
      <div className="panel panel-default" ref="blockRow"
           style={{position: 'relative', transform: `translateY(${block.transform}px)`, zIndex}}>
        <div className="panel-heading clearfix" style={{userSelect: 'none'}}
             onMouseDown={this.headerMouseDown.bind(this)} onDoubleClick={this.headerDoubleClick.bind(this)}>
          {block.name}
          <button className="pull-right" style={{width: "25px", marginTop: "-2px"}}
                  onClick={this.collapseClick.bind(this)}>{!this.props.block.collapsed ? '−' : '+'}</button>
          <Button bsStyle="danger" className="pull-right" style={{marginTop: "-4px", marginRight: "10px"}}
                  onClick={this.removeClick.bind(this)} disabled={lock}>Удалить блок</Button>
          <Button bsStyle="default" className="pull-right" style={{marginTop: "-4px", marginRight: "10px"}}
                  onClick={this.copyClick.bind(this)} disabled={lock}>Копировать блок</Button>
        </div>
        {!this.props.block.collapsed
          ?
          <div>
            <div className="panel-body">
              {block.blocks && block.blocks.map((subBlock, index) => {
                return (
                  <BlockLvl2
                    key={index}
                    lock={lock}
                    block={subBlock}
                    hierarchy={[block.unique_id]}
                    showExpertModal={showExpertModal}
                    showOptionModal={showOptionModal}
                    editOptionBlock={editOptionBlock}
                    editExpertBlock={editExpertBlock}
                    removeBlock={removeBlock}
                    collapseBlock={collapseBlock}
                  />
                )
              })}
            </div>
            <div className="panel-footer">
              <Button bsStyle="primary" style={{marginRight: "10px"}} onClick={this.addSubBlockClick.bind(this)}
                      disabled={lock}>Добавить подблок</Button>
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

export default LayoutBlock;
